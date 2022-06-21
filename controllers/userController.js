import User from '../models/user.js'
// ! Import the library
import jwt from 'jsonwebtoken'
// ! Importing my secret...
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  const body = req.body
  try {
    if (body.password !== body.passwordConfirmation) {
      return res.status(422).json({ 
        message: "Passwords do not match.",
        errors: {
          passwordConfirmation: 'Passwords do not match',
        }, 
      })
    }
    const user = await User.create(body)
    res.status(201).json(user)
  } catch (err) {
    // res.status(422).json({ 
    //   message: 'User has missing or invalid fields.',
    //   errors: {
    //     email: 'This email already exists',
    next(err)
  }
}
  

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })

    const isValidPw = user.validatePassword(req.body.password)

    if (isValidPw) {

      // ! Making a JWT is the user is who they say they are.
      const token = jwt.sign(
        // ! 1) we provide a payload.
        { userId: user._id }, // ! Encoding our user id in our payload.
        secret, // ! Secret key only we know
        { expiresIn: '24h' } // ! Expiry hours
      )

      res.json({ 
        message: "Login successful!", 
        token,
        user, // ! Send back the token with the response. 
      })
    } else {
      res.status(400).json({ message: "Login failed!" } )
    }
  } catch (err) {
    res.status(400).json({ message: "Login failed!" } )
  }
}

export default {
  register,
  login,
}