import mongoose from 'mongoose'


const gallarySchema = new mongoose.Schema({

title: {
    type: String,
    required: true
},
images:{
    type: Array,
    required: true
}


}, {timestamps: true})

const Gallary = mongoose.model('Gallary', gallarySchema)


export default Gallary