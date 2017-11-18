let localConfig = {}

try {
  localConfig = require('./config.local').default
} catch(e) {
}

export default {
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
  host: 'localhost',
  port: 3000,
  session: {
    secret: 'should I switch to spotify?'
  },
  concurrency: 8, // Above 9 will likely trigger a 'Quota limit exceeded',
  days: 21, // Show releases from last x days
  cache: {
    enabled: true,
    life: 12 * 60 * 60, // 12 hours by default
  },
  ...localConfig
}
