import Plant from '../../models/plants.js'
import User from '../../models/user.js'

// ! This removes the testdata when you're done.
// ! So that your setup file guarantees that's the only data in the database
// ! when an individual test runs.
export default async function tearDown(done) {
  await User.deleteMany()
  await Plant.deleteMany()
  done()
}