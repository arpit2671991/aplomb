import mongoose from 'mongoose'


const gallarySchema = new mongoose.Schema({

title: {
    type: String,
    required: true
},
description:{
type: String,
required: true
},
isPhoto:{
    type: Boolean,
    default: true
},
isVideo: {
    type: Boolean,
    defaul: false
},
date: {
    type: String,
},
images:{
    type: Array,
    required: true
},
videoLink:{
    type: String,
    
}


}, {timestamps: true})

const Gallary = mongoose.model('Gallary', gallarySchema)


export default Gallary