import Plant from '../models/plants.js'
import User from '../models/user.js'

async function createCart(req, res) {
  try {
    // ! We need to provide the pokemon ID we're commenting on.
    const plantId = req.params.plantId
    // ! We also need to get the user/user ID for the user commenting.
    const userId = req.currentUser._id
    const user = await User.findById(userId)
    console.log(userId)
    // ! Grab the info from the request body.
    const cart = req.body
    // ! Get the pokemon we're comment on.
    const plant = await Plant.findById(plantId).populate('user')
    // ! Handle it if no pokemon is found
    if (!plant) {
      return res.json({ message: 'No plant found' })
    }
    // ! Push the new comment to the comments array
    cart.user = user
    // ! Pushing our new comment to this pokemon does
    // ! NOT update it in the database YET. 
    user.cart.push(plant)

    // ! So we need to save it to the database.
    const savedUser = await user.save()
    // ! Sending back the comment
    res.json(savedUser)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem adding to cart" })
  }
}

export default {
  createCart,
}