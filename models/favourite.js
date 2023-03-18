const mongoose = require("mongoose")

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 2 }
  },
  title: {
    type: String,
    required: true
  },
  overview: { 
    type: String,
    required: true
  },
  posterPath: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model("Favourite", FavouriteSchema)