import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js'

export const signup = async(req, res , next) => {
    try {
        const {firstName, lastName, email, password, mobileNumber, address, city, state, country, role, profilePicture, dob} = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        // check if user aleady exist
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(401).json('User already exist!')
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber,
            address,
            city,
            state,
            country,
            role,
            profilePicture,
            dob
        })

        await newUser.save()
        
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json('intermal server error')
    }

}


export const signin = async(req, res, next) => {
    const {email, password} = req.body

    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        const token = jwt.sign({id: validUser._id}, `${process.env.jwt_secret}`, {expiresIn: '1h'})
        if(!token) return res.status(404).json({msg:'your session expired. please login again!'})
        const {password: pass, ...rest} = validUser._doc
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    } catch (error) {
       next(error)
    }

}

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json({msg: 'User logged out'})
    } catch (error) {
        next(error)
    }

}