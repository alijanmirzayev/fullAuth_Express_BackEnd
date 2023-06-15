import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true
})

export const userModel = model('user', userSchema)