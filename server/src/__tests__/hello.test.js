const testServer = require('express')()
testServer.use('/', require('../routes/hello'))

const request = require('supertest')(testServer)

describe('hello router', () => {

  it('is responding with an OK status', async () => {
    const res = await request.get('/')
    expect(res.status).toEqual(200)
  })

})