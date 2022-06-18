import mongoose from 'mongoose'

// ! Brand new schema for comments.
const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { // ! This is adding fields that mongoose supports for you. 
  timestamps: true,
})

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  likes: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  // ! Add comments to pokemon
  // ! Embedding a schema in pokemon. Subdocument.
  // ! We're giving pokemon an array of comments. 
  comments: [reviewSchema],
})

export default mongoose.model('Plant', plantSchema)

