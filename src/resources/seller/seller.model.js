import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const sellerSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile_number: String,
    service: {
        type: String,
        enum: ['Carpenter', 'Electrician', 'Plumber', 'Builder'],
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        default: 500
    },
    unit: {
        type: String,
        required: true,
        default: 'sq ft',
        enum: ['sq ft', 'm sq'],
    },
    address: {
        state: String,
        city: String,
        zip: String,
        house_no: String,
        landmark: String,
        complete_address: String,
    },
    experience: Number,
    preference: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'seller',
        },
    ],
})

sellerSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }

        this.password = hash
        next()
    })
})

sellerSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

sellerSchema.index({ service: 1, "address.city": 1, "address.zip": 1 })

export const Seller = mongoose.model('seller', sellerSchema)
