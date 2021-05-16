import mongoose from 'mongoose'

const referenceSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
    },
    mobile_number: String,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller',
        required: true,
    },
    address: {
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        complete_address: {
            type: String,
            required: true,
        },
    },
    images: [String],
})

