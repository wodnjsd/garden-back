import jwt from "jsonwebtoken"
import { secret } from "../config/environment.js"
import User from '../models/user.js'

export default function secureRoute(req, res, next) {

  // ! 1) Get the token (and cleans it up)
  const rawToken = req.headers.authorization
  // ? Simple check to make sure we've got a sensible token
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    // not authenticated
    return res.status(401).json({ message: 'Unauthorized' })
  }
  // ? Remove bearer from the beginning of the token
  const token = rawToken.replace('Bearer ', '')

  // ! 2) Verify the token
  jwt.verify(token, secret, async (err, payload) => {
    // ? If there's any kind of error, send back unauthorized
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    // ? If we've got this far, we now have a valid token.

    // ! 3) Get the user from the token, and move to the route.
    // ! We need this part for permissions later.
    const user = await User.findById(payload.userId)

    // ? Checking if the user exists.
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // ? Adding the current user to our request
    req.currentUser = user

    if (user.isAdmin === true) {
      console.log('yes')
    }

    // ! Finally, pass it on to the route
    next()
  })  
}