const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type:String,
            required: true,
            trim: true
        },
        contact: {
            type: String,
            required: true,
            trim:true,
            match: [/^[0-9]{10,15}$/, "please enter a valid number"],
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required:true,
            trim: true,
        },
        district:{
            type:String,
            required:true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        pinCode: {
            type: String,
            required:true,
            trim: true,
        },
        landmark: {
            type: String,
            trim:true,
        },
        alternateContact: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true,
            default: "India"
        },
        addressType: {
            type: String,
            required: true,
            enum: ["Home", "Work"],
            default: "Home",
        },
        isDefault: {
            type: Boolean,
            default: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Address", addressSchema);