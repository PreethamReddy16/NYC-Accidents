
var cors = require('cors');
const express=require('express')
const app=express();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');

app.use(bodyParser.json());
require('dotenv/config');


app.use(cors());
// const port = process.env.PORT || 3000;


//MiddleWares
// app.use('/posts',()=>{
//     console.log('Running middleware')
// });
//connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION,()=>
console.log('Connected to MongoDB'));


//import routes
const postsRoute=require('./routes/posts');


app.use('/posts',postsRoute);


//list of db


//listening to server
// app.listen(port, ()=>{
//     console.log(`Server is running on port: ${port}`);
// });

app.listen(4000)