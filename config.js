let localConfig = {}

try {
  localConfig = require('./config.local').default
} catch(e) {
}

console.log(localConfig)


export default {
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  host: 'localhost',
  port: 3000,
  session: {
    secret: 'should I switch to spotify?'
  },
  ...localConfig
}
