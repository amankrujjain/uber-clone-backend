const dotenv = require('dotenv')

dotenv.config();
const express = require('express');
const app = express();
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes');

connectToDB();

// dependancy imports

const cors = require('cors');


// implement of dependancy

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.send("Hello world")
});

app.use('/users', userRoutes)

module.exports = app;