const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator')

const registerUser = async( req,res,next )=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            })
        };

        const {firstname, lastname, email, password} = req.body;

        const hashPassword = await userModel.hashPassword(password);


    } catch (error) {
        
    }
};

module.exports = {
    registerUser
}