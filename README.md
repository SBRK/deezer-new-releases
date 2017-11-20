# deezer-new-releases
List all new releases from your followed artists

## Configuration:
Edit the `config.js` file to add your Deezer API `appId` and `appSecret`. To get one, you need to register an app at

https://developers.deezer.com/myapps

If you keep the default host/port, you will need to configure it as such:

* Application domain: `localhost:3000`
* Redirect URL after authentication: `http://localhost:3000/deezerCallback`

## Usage:
```bash
npm install
npm start
```

Go to http://localhost:3000, you will be prompted to login to Deezer. If all goes well, you will be authentified, and new releases from the last 21 days will be fetched and returned in JSON.
