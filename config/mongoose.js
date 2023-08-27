const mongoose = require('mongoose');

//connecting to database
mongoose.connect('mongodb+srv://chetana19112002:chetana19112002@cluster0.auhxhk9.mongodb.net/?retryWrites=true&w=majority');

//acquire the connection to check if it is successfull
const db=mongoose.connection;


db.on('error',console.error.bind(console,"error in connecting the database"));

//up and running the print the statement
db.once("open",()=>{
    console.log("successfully connected to database");

});

module.exports=db;
