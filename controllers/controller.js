// ? The controller contains the code to work with our data and send it back to the user.
// ? It's the part that can interact and manipulate our data. 

import Plant from "../models/plants.js"

async function getPlants(req, res) {
  try {
    // ! Populating the user field, with the full object.
    const allPlants = await Plant.find().populate('user')
    // .populate('review.user')
    // .populate('cart.user')
    res.json(allPlants)
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: "We had problems handling your request on our side 😖. Please try again later." })
  }
}

//! For admin only
async function createPlant(req, res) {
  try {
    const newPlant = req.body
    // ! Getting the logged in user, and attaching it to the pokemon.
    newPlant.user = req.currentUser
    const createdPlant = await Plant.create(newPlant)
    res.status(201).json(createdPlant)
  } catch (e) {
    return res.status(422).json({ message: 'Plant has missing or invalid fields.' })
  }
}

async function getSinglePlant(req, res) {
  try {
    const plantId = req.params.plantId
    const plant = await Plant.findById(plantId).populate('user')
    // .populate('review.user')
    // .populate('cart.user')

    if (!plant) return res.json({ message: "Plant not found" })

    res.json(plant)
  } catch (e) {
    res.json({ message: 'There was problem trying to get this plant' })
  }
}

//! For admin only
async function removePlant(req, res) {
  try {
    const plantId = req.params.plantId
    // ! Current user
    const user = req.currentUser

    const plantToDelete = await Plant.findById(plantId)

    // ! If you're not the person who made this pokemon, unauthorized.
    if (!plantToDelete.user.equals(user._id)) {
      return res.json({ message: 'Unauthorized' })
    }

    if (!plantToDelete) return res.json({ message: "Plant not found" })

    await Plant.findByIdAndDelete(plantId)

    res.sendStatus(204)
  } catch (e) {
    res.status(422).json({ message: "This Plant ID is in an invalid format." })
  }
}

//! For admin only
async function updatePlant(req, res) {
  try {
    const plantId = req.params.plantId
    const newPlant = req.body

    const plantToUpdate = await Plant.findById(plantId).populate('user')

    if (!plantToUpdate) return res.json({ message: "Plant not found" })

    const updatedPlant = await Plant.findByIdAndUpdate(plantId, newPlant, { new: true })

    res.status(201).json(updatedPlant)
  } catch (e) {
    if (e.path === "_id") {
      res.status(422).json({ message: "This Plant ID is in an invalid format." })
    } else {
      res.status(422).json({ message: 'Plant has missing or invalid fields.' })
    }
  }
}

export default {
  getPlants,
  createPlant,
  getSinglePlant,
  removePlant,
  updatePlant,
}