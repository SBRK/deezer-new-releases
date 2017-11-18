import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'

import Promise from 'bluebird'
import _ from 'lodash'
import moment from 'moment'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {JssProvider, SheetsRegistry} from 'react-jss'

import deezer, { deezerRequest, deezerCreateSession } from './deezer'
import config from './config'

import AlbumList from './components/AlbumList'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: _.get(config, ['session', 'secret'], ''),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: _.get(config, ['session', 'cookie', 'maxAge']) || (60 * 60 * 24),
  }
}))

app.get('/', async (req, res) => {
  if (!req.session.deezerAccessToken) {
    const redirectUrl = `http://${_.get(config, 'host')}:${_.get(config, 'port')}/deezerCallback`
    const loginUrl = deezer.getLoginUrl(_.get(config, 'appId'), redirectUrl)

    res.redirect(loginUrl)
    return
  }

  try {
    const sheets = new SheetsRegistry()
    const releases = await getMyArtistsReleases(req.session.deezerAccessToken, _.get(req, ['query', 'days']))
    const reactHtml = ReactDOMServer.renderToString(
      <JssProvider registry={sheets}>
        <AlbumList albumList={releases}/>
      </JssProvider>
    )

    const html = `
      <html>
        <head>
          <style type='text/css' id='server-side-styles'>
            html, body {
              margin: 0;
              padding: 0;
              background: black;
            }
            ${sheets.toString()}
          </style>
        </head>
        <body>
          ${reactHtml}
        </body>
      </html>
    `
    res.send(html)
  } catch (error) {
    console.error(error)
    res.send(error.toString())
  }
})

app.get('/deezerCallback', async (req, res) => {
  const code = _.get(req, ['query', 'code'])

  if (!code) {
    const error = _.get(req, ['query', 'error_reason'])
    console.error(error)
    res.send(error)
    return
  }

  try {
    const accessToken = await deezerCreateSession(_.get(config, 'appId'), _.get(config, 'appSecret'), code)

    req.session.deezerAccessToken = accessToken
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.send(error.toString())
  }
})

const getArtistReleases = (accessToken, id) => deezerRequest(accessToken, `artist/${id}/albums`, { limit: 9999 })
const getMyArtists = accessToken => deezerRequest(accessToken, 'user/me/artists', { limit: 9999 })
const getMyArtistsReleases = async (accessToken, days) => {
  const artists = await getMyArtists(accessToken)

  console.log(`Found ${artists.length} artists`)

  let releases = await Promise.map(
    artists,
    async (artist, index, length) => {
      //console.log(`Getting releases for ${artist.name} (${index + 1}/${length})`)

      const releases = await getArtistReleases(accessToken, artist.id)
      _.each(releases, release => {
        release.artist_id = artist.id
        release.artist_name = artist.name
      })

      return releases
    },
    { concurrency: _.get(config, 'concurrency')},
  )

  releases = _.flatten(releases)

  console.log(`Found ${releases.length} before filtering`)

  releases = _.filter(
    releases,
    (album) => moment(album.release_date).isAfter(moment().subtract(days || _.get(config, 'days') || 21, 'days'))
  )

  console.log(`Found ${releases.length} after filtering`)

  releases = releases.sort((album1, album2) => {
    const date1 = moment(album1.release_date)
    const date2 = moment(album2.release_date)

    if (date1.isBefore(date2)) {
      return 1
    } else {
      return -1
    }
  })

  return releases
}

app.listen(_.get(config, 'port'))
