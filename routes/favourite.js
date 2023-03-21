const router = require("express").Router();
const auth = require("../middleware/auth-check");
const User = require("../models/User");
const Favourite = require("../models/favourite");


router.post("/",async(req, res)=>{
  const user = await User.findById(req.body.userId);

  const favouriteRequest = {
    user,
    title: req.body.title, 
    overview: req.body.overview,
    posterPath: req.body.posterPath
   
  }

  const favourite = await Favourite.create(favouriteRequest)

  user.favourites.push(favourite)
  await user.save()

  res.send("OK");
});


router.get("/:Id", async (req, res) =>{
  try {
    const user = await User.findById(req.params.Id);
    //if (user._id == req.user._id) res.status(401).send("not authorized");

    const favourites = user.favourites;
    const records = await Favourite.find().where('_id').in(favourites).exec();

    

    res.send(records);
    } catch (error) {
    console.log(error.message)
  }

  
});



module.exports = router;