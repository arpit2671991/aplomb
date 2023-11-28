// firstName, lastName, email, password: hashedPassword, mobileNumber, address, city, state, country, role, profilePicture, dob

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'
    },
    dob: {
        type: String
    },
   
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User