import localConfig from './config.local'

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
