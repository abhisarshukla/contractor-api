import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const customerSchema = new mongoose.Schema({
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
    address: {
        state: String,
        city: String,
        zip: String,
        house_no: String,
        landmark: String,
        complete_address: String,
    },
})

customerSchema.pre('save', function (next) {
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

customerSchema.methods.checkPasssword = function (password) {
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

export const Customer = mongoose.model('customer', customerSchema)
