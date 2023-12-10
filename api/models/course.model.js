

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
       type: Array,
        required: true
    },
    link: {
        type: String,
       
    },
    fees: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
       
    },
    eligibility: {
        type: String,
      
    },
    isActive: {
        type:Boolean,
        default: true
    },
    isFeatured: {
        type:Boolean,
        default: true
    },
    isOffer: {
        type:Boolean,
        default: false
    },
    
   
}, {timestamps: true})

const Course = mongoose.model('Course', courseSchema)

export default Course