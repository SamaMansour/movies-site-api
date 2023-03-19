const router = require("express").Router();
const auth = require("../middleware/auth-check");
const User = require("../models/User");
const Favourite = require("../models/favourite");


router.post("/", auth, async(req, res)=>{
  const user = await User.findById(req.body.userId);

  const favouriteRequest = {
    user,
    title: req.body.title, 
    overview: req.body.overview
   
  }

  const favourite = await Favourite.create(favouriteRequest)

  user.favourites.push(favourite)
  await user.save()

  res.send("OK");
});



module.exports = router;