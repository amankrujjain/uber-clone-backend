const req = require('express/lib/request');
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

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message:'user already exists'
            })
        }

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
        return res.status(500).json({
            success: false,
            message:'Internal server error'
        })
    }
};

const loginUser = async(req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:' Validation failed',
            errors: errors.array()
        })
    };

    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({
                success: false,
                message:'Invalid email or password'
            })
        };

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message:'Invalid email or password'
            });
        };

        const token = user.generateAuthToken();
        return res.status(200).json({
            success: true,
            message:'User logged in successfully',
            user: user,
            token, token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:'Internal server error'
        })
    }
}
module.exports = {
    registerUser,
    loginUser
}