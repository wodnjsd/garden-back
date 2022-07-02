// ? A file with helper functions to interact with a real database, when we're ready to do that.

import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export async function connectToDb() {
  return mongoose.connect(dbURI)
}

export async function disconnectDb() {
  return mongoose.disconnect()
} 
