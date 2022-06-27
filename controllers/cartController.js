import Plant from '../models/plants.js'
import User from '../models/user.js'

async function createCart(req, res) {
  try {
    // ! We need to provide the plant ID we're commenting on.
    const plantId = req.params.plantId
    // ! We also need to get the user/user ID for the user commenting.
    const userId = req.currentUser
    const user = await User.findById(userId)
    console.log(req.currentUser.password)
    // ! Grab the info from the request body.
    // const cart = req.body
    // ! Get the pokemon we're comment on.
    const plant = await Plant.findById(plantId).populate('user')
    // ! Handle it if no pokemon is found
    if (!plant) {
      return res.json({ message: 'No plant found' })
    }
    // ! Push the new plant to the plants array
    // cart.user = user
    // ! Pushing our new plant to this cart does
    // ! NOT update it in the database YET. 
    user.cart.push(plant)

    // ! So we need to save it to the database.
    const savedUser = await user.save({ validateBeforeSave: false })
    console.log(savedUser)
    // ! Sending back the user
    res.json(savedUser)
  } catch (e) {
    console.log(e)
    res.json({ message: "There was a problem adding to cart" })
  }
}

async function removePlant(req, res) {
  try {
    const plantName = req.params.plantName
    const userId = req.currentUser
    const user = await User.findById(userId)
    const userCart = user.cart
    console.log(userCart)
    const plantToDelete = userCart.find(item => 
      item.name === plantName
    )

    const index = userCart.indexOf(plantToDelete)
    console.log(plantToDelete)

    // if (!plantToDelete.user.equals(user._id)) {
    //   return res.json({ message: 'Unauthorized' })
    // }

    userCart.splice(index, 1)

    const savedUser = await user.save({ validateBeforeSave: false })
    console.log(savedUser)

    res.sendStatus(204)
  } catch (e) {
    console.log(e)
    res.status(422).json({ message: "This Plant ID is in an invalid format." })
  }
}



export default {
  createCart,
  removePlant,
}