// ? This file will be our 'data model': which is a representation we use to interact more
// ? easily with data stored in our database, and to constrain/validate that data.

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'
import validator from 'validator';

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { // ! This is adding fields that mongoose supports for you. 
  timestamps: true,
})


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: true,
    validate: (password) => /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password),
  },
  cart: [cartSchema],
  isAdmin: { type: Boolean, default: false },
})

// userSchema.pre('save', function hashPassword(next) {
//   if (this.isModified('password')){
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
//   }  
//   next()
// })

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: false, _id: false } }))
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)

