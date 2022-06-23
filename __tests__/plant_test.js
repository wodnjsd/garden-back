/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

//  * Mocha 
// ? This is a testing suite. It ties everything together.
// ? 'describe' is a mocha keyword, to create suites of tests.
describe('Testing GET /api/plants', () => {

  //  * Mocha
  // ? Before each test we want to run some code to setup our environment.
  beforeEach(done => {
    // ? Seed the database with some test data.
    setup(done)
  })

  //  * Mocha
  // ? After each test, we nee to clear out our database, OR ELSE
  // ? we will have an inconsistent testing environment.
  afterEach(done => {
    tearDown(done)
  })

  // ! SOME TESTS:
  it('should return a 200 response status code', (done) => {
    // ! api: supertest
    api.get('/api/plants')
      .end((err, res) => {
        // ! Chai: make an assertion
        expect(res.status).to.eq(200)
        // ! Call done() when the test is finished.
        done()
      })
  })

  it('should return an array of 17 plants', (done) => {
    // ! api: supertest
    api.get('/api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an("array")
        // expect(res.body.length).to.be.eq(17)
        done()
      })
  })

})

//  We are now adding a different test for a different route
describe('Testing GET /api/plants/:plantId', () => {

  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  it('should return a plant object', (done) => {
    // ! Getting all the plants, just so we can get an ID for one.
    api.get('/api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an("array")
        const plantId = res.body[0]._id

        // ! Getting a plant using that ID (of the first plant (based off the index, right!))
        api.get(`/api/plants/${plantId}`)
          .end((err, res) => {
            // ! Check if its an object.
            expect(res.body).to.be.an("object")
            done()
          })

      })
  })

})

//  POST test 
describe('Testing POST /api/plants', () => {

  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  it('should return an object', (done) => {
    api.post('/api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an("object")
        done()
      })
  })

})
// DELETE test
describe('Testing DELETE /api/plants/:plantId', () => {

  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })
  it('should return a status code 401', (done) => {
    api.get('/api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an("array")
        const plantId = res.body[0]._id

        api.post('/api/login')
          .send({
            "email": "robynamysmith92@gmail.com",
            "password": "Holiday!23",
          })
          .end((err, res)=> {
            expect(res.status).to.eq(200)
            expect(res.body.token).to.be.a("string")
          })
      
        api.delete(`/api/plants/${plantId}`)
          .end((err, res) => {
            // It should return 'Unauthorized' as the user is not logged in, so therefore we cannot test the token to make sure that user can delete the plant
            expect(res.status).to.eq(401)
            done()
          })
      })

  })

})