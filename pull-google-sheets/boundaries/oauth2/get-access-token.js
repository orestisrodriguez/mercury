const superagent = require('superagent')
const { prop, path } = require('ramda')

const tokenUrl = 'https://oauth2.googleapis.com/token'

function getAccessToken (clientId, clientSecret, refreshToken) {
  const payload = {
    'grant_type': 'refresh_token',
    'client_id': clientId,
    'client_secret': clientSecret,
    'refresh_token': refreshToken
  }

  return superagent
    .post(tokenUrl)
    .send(payload)
    .then(prop('body'))
    .then((response) => ({
      accessToken: response.access_token,
      expiresAt: new Date().valueOf() + (response.expires_in * 1000)
    }))
    .catch(prop('response'))
}

module.exports = getAccessToken
