// ! This helper file is always run FIRST, before any tests
// ! It gets run when we do npm run test

process.env.NODE_ENV = 'test'

// ! In this file I do setup for all of the tests, defining globals
// ! and so on.

// * CHAI
// ? Chai is an assertion library 
// ? Assertions evaluate to true or false.
// ? Does my plant.name equal what I think it should?
// Kinda like: expect(plant.name).to.be.a('string')
// expect (plant.name).to.equal('English Ivy') 
import chai from 'chai'
// ! Global in node creates global variables
global.expect = chai.expect

// *Supertest
// ? Supertest is a 'wrapper', a function for testing APIs
// ? With supertest I can make requests programmatically 
// ? to test my API

import supertest from 'supertest'
// ! Supertest will 'wrap' my express API with new methods
// ! for testing
import expressApp from '../server.js'
// ! To setup supertest we do:
global.api = supertest(expressApp)

// * We now have a suitable environment for testing.
// * And we have setup everything we need.