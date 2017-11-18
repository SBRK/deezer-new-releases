import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'

import Album from './Album'

const styles = {
  albumList: {
    width: '100%',
    //background: 'black',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    boxSizing: 'border-box'
  },
}

const AlbumList = ({
  classes,
  albumList
}) => (
  <div className={classes.albumList}>
    {_.map(albumList, album => (
      <Album {...album} key={album.id} />
    ))}
  </div>
)

export default injectSheet(styles)(AlbumList)
