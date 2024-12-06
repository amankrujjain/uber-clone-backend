const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT,
        console.log("Database connected"))
        .catch(err => console.log(err))
};

module.exports  = connectToDb;