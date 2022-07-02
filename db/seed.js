// ? A file that will be used to 'seed' our database with initial data.

import mongoose from 'mongoose'
import Plant from '../models/plants.js'
import User from '../models/user.js'
import plantData from './data/data.js'
import userData from './data/userData.js'
import { connectToDb, disconnectDb } from './helpers.js'

async function seed() {
  await connectToDb()

  // await mongoose.connection.db.dropDatabase()

  console.log('Connected to the database! 🌱')

  // ! Create my user(s) first
  const users = await User.create(userData)
  const spikeUser = users[0]

  // ! Add a user to each pokemon
  const plantsWithUsers = plantData.map(plant => {
    return { ...plant, user: spikeUser }
  })

  // ! Create the pokemon with users
  const plant = await Plant.create(plantsWithUsers)
  console.log(plant)


  await disconnectDb()
  console.log('Goodbye 🌱')
}

seed()