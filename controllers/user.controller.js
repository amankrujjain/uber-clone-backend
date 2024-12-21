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

        const {fullname, email, password} = req.body;

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        })

        const token = user.generateAuthToken();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: user,
            token: token
        })

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    registerUser
}