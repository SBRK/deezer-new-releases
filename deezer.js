import DZ from 'node-deezer'
import Promise from 'bluebird'

const deezer = new DZ()

export const deezerRequest = (accessToken, action, query) => {
  return new Promise((resolve, reject) => {
    deezer.request(accessToken,
    {
      resource: action,
      method: 'get',
      fields: query,
    },
    (err, result = {}) => {
      if (err) {
        return reject(err)
      }

      const {
        data = null
      } = result

      return resolve(data)
    })
  })
}

export const deezerCreateSession = (appId, appSecret, code) => {
  return new Promise((resolve, reject) => {
    deezer.createSession(appId, appSecret, code, (err, result) => {
      if (err) {
        return reject(err)
      }

      return resolve(result.accessToken)
    })
  })
}

export default deezer
