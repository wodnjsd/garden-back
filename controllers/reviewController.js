import Plant from '../models/plants.js'

async function createReview(req, res) {
  try {
    // ! We need to provide the pokemon ID we're commenting on.
    const plantId = req.params.plantId
    // ! We also need to get the user/user ID for the user commenting.
    const user = req.currentUser
    // ! Grab the info from the request body.
    const review = req.body
    // ! Get the pokemon we're comment on.
    const plant = await Plant.findById(plantId)
    // ! Handle it if no pokemon is found
    if (!plant) {
      return res.json({ message: 'No plant found' })
    }
    // ! Push the new comment to the comments array
    review.user = user
    // ! Pushing our new comment to this pokemon does
    // ! NOT update it in the database YET. 
    plant.comments.push(review)

    // ! So we need to save it to the database.
    const savedPlant = await plant.save()
    // ! Sending back the comment
    res.json(savedPlant)
  } catch (e) {
    res.json({ message: "There was a problem reviewing" })
  }
}

export default {
  createReview,
}