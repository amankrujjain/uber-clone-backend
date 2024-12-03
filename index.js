const dotenv = require('dotenv')

dotenv.config();
const express = require('express');
const app = express();


// dependancy imports

const cors = require('cors');


// implement of dependancy

app.use(cors())


app.get('/', (req,res)=>{
    res.send("Hello world")
});

module.exports = app;