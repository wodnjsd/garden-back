// ? Our server file is responsible for setting up and running our express server,
// ? with all the configuration that it needs to work.

import express from "express"
import { connectToDb, disconnectDb } from "./db/helpers.js"
import logger from "./middleware/logger.js"
import router from "./views/router.js"
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from "./middleware/errorHandler.js";
import cors from 'cors'

// ! Moved the app out of startServer so I can export it below
const app = express()

async function startServer() {
  try {
    app.use(express.json())

    app.use(cors())

    app.use(mongoSanitize());

    app.use(logger)

    app.use('/api', router)

    app.use(errorHandler);

    await connectToDb()

    console.log('Connected to DB!')

    app.listen(4000, () => console.log("🤖 Hello express!"))
  } catch (e) {
    await disconnectDb()
  }
}

startServer()

// ! Export the app, so supertest can use it.
export default app

