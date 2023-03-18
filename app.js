const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 1337;
const connectDB =require("./config/connection");
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const authRoutes = require('./routes/auth');
const favouriteRoute = require('./routes/favourite');
const db = require('./config/connection');



dotenv.config( { path : '.env'} )
db.connect('mongodb://localhost/movies');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/movies');
// require('./models/user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());



 passport.use('local-signup', localSignupStrategy);
 passport.use('local-login', localLoginStrategy);




app.use('/auth', authRoutes);
app.use("/favourites", favouriteRoute);



app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});



const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.listen(PORT);