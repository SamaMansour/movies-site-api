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


router.get("/:userId",  async (req, res) =>{
  try {
    const user = await User.findById(req.params.userId);
    if (user._id == req.user._id) res.status(401).send("not authorized");

    const favourites = user.favourites;

    res.send(favourites)
    } catch (error) {
    console.log(error.message)
  }

  
});



module.exports = router;