import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
        enum: ['Carpenter', 'Electrician', 'Plumber', 'Builder'],
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller',
        required: true,
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'customer',
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        default: 'sq ft',
        enum: ['sq ft', 'm sq'],
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: Date,
    completed: Boolean,
})

export const Contract = mongoose.model('contract', contractSchema)
