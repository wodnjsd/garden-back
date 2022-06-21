import Plant from '../../models/plants.js'
import User from '../../models/user.js'

// !This is for seeding your test database with data!
export default async function setup(done) {
  try {
    const users = await User.create([
      {
        "username": "Robyn",
        "email": "robynamysmith11@gmail.com",
        "password": "Holiday!23",
        "passwordConfirmation": "Holiday!23",
      }
    ])

