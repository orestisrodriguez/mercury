const { expect } = require('chai')
const getAccessToken = require('../../../boundaries/oauth2/get-access-token')

const {
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  REFRESH_TOKEN
} = process.env

describe('getAccessToken', () => {
  it('should return error with invalid credentials', () => {
    return getAccessToken('', '', '')
      .then((error) => {
        expect(error.status).to.equal(400)
        expect(error.body.error).to.equal('invalid_request')
      })
  })

  it('should return access token', () => {
    return getAccessToken(OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, REFRESH_TOKEN)
      .then((response) => {
        expect(response.accessToken).to.be.a('string').that.is.not.empty
      })
  })
})
