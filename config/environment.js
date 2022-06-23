// ? A file containing our environment variables

// export const dbURL = 'mongodb://127.0.0.1:27017/plantsdb'
export const mongoURL = 'mongodb://127.0.0.1:27017'

// ! If mocha is running your tests, line 7 will be true, and so the
// ! DB URL will be pokemondb-test. If you're running express normally
// ! it will be pokemondb
export const dbURL = process.env.NODE_ENV === 'test' ?
  `${mongoURL}/plantsdb-test` : 
  `${mongoURL}/plantsdb`

// ! Create a secret for JWT verification
export const secret = 'horsebatterycowstapleapple'