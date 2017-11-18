import NodeCache from 'node-cache'
import _ from 'lodash'

import config from './config'

const cache = new NodeCache({
  stdTTL: _.get(config, ['cache', 'life']),
  checkperiod: 60,
})

export const cacheSet = (key, value) => (
  new Promise((resolve, reject) => {
    cache.set(key, value, (error, success) => {
      if (error) {
        return reject(error)
      }
      return resolve(success)
    })
  })
)

export const cacheGet = key => (
  new Promise((resolve, reject) => {
    cache.get(key, (error, value) => {
      if (error) {
        return reject(error)
      }
      return resolve(value)
    })
  })
)
