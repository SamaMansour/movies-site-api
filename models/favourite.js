const mongoose = require("mongoose")

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 2 }
  },
  title: {
    type: String,
    
  },
  overview: { 
    type: String,
   
  },
  posterPath: { 
    type: String,
   
  },
})

FavouriteSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Favourite", FavouriteSchema)