
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
   
    email: {
        type: String,
        required: true
    },
   
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
   
}, {timestamps: true})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact