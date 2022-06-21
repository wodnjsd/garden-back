/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'


// * Mocha ☕️
// ? This is a testing suite. It ties everything together.
// ? 'describe' is a mocha keyword, to create suites of tests.
describe('Testing REGISTER', () => {

  // * Mocha
  // ? before each test we want to run some code to setup our environment.
  beforeEach(done => {
    // ? Seed the database with some test data.
    setup(done)
  })

  // * Mocha
  // ? after each test, we need to clear out our database, OR ELSE
  // ? we will have an inconsistent testing environment
  afterEach(done => {
    tearDown(done)
  })

  it('should be able to register a new user', (done) => {
    api.post('/api/register')
    // ! Here's your POST data
      .send({
        "username": "Hank",
        "email": "hank1@gmail.com",
        "password": "Pineapple!23",
        "passwordConfirmation": "Pineapple!23",
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq("Hank")
        done()
      })
  })

  it('should fail to register when fields are missing', (done) => {
    api.post('/api/register')
    // ! Here's your POST data..
      .send({
        "username": "Hank",
        "password": "Pineapple!23",
        "passwordConfirmation": "Pineapple!23",
      })
      // ! End is what happens when the request is finished 
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })
  
  it('should be able to login a new user', (done) => {
    api.post('/api/login')
    // Here is your POST data
      .send({
        "password": "Spike12345!!",
        "email": "spike@ibegyourgarden.com",
      })
      .end((err, res) => {
        expect(res.status).to.eq(200)
        expect(res.body.token).to.be.a("string")
        done()
      })
  })

})