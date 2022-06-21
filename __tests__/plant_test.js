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

  // ! FINALLY SOME TESTS:
  it('should return a 200 response status code', (done) => {
    // ! api: supertest
    api.get('api/plants')
      .end((err, res) => {
        // ! Chai: make an assertion
        expect(res.status).to.equal(200)
        // ! Call done() when the test is finished.
        done()
      })
  })

  it('should return an array of 17 plants', (done) => {
    // ! api: supertest
    api.get('api/plants')
      .end((err, res) => {
        expect(res.body).to.be.an("array")
        expect(res.body.length).to.be.equal(17)
        done()
      })
  })

})