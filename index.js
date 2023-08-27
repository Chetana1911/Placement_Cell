const express=require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router =require('express').Router();

const app=express();


const port = process.env.PORT || 8000;
const db = require('./config/mongoose');

app.use(
    bodyParser.urlencoded({
        extended:false,
    })
);
//used for session
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport");



const MongoStore = require("connect-mongo");
app.use(cookieParser());

//set up view engine
app.set('view engine','ejs');
app.set('views',"./views");

// mongo-store is used to store session cookies in database
app.use(
    session({
        name:"placement-cell",
        secret:"asewe",
        saveUnitialized:false,
        resave:false,
        cookie:{
            maxAge:1000*60*100,
        },
        store:MongoStore.create({
            mongoUrl: "mongodb+srv://chetana19112002:chetana19112002@cluster0.auhxhk9.mongodb.net/?retryWrites=true&w=majority",
            autoRemove:'disabled',
        },
        function(err){
            console.log(err || "connect-mongodeb setup ok");
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.setAuthenticateUser);
app.use(passport.setAuthenticationUser);


app.use('/',require("./routes"));

app.use(bodyParser.json());

app.listen(port,(err)=> {
    if(err){
        console.log("error in starting the server",err);
        return;
    }
    console.log("server is successfully running on port :",port);
});
