const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please Enter a Valid email address',
        },
    },
    password: {
        required: true,
        type: String,
        trim: true,
    },
    type: {
        type: String,
        default: 'user',
    },
    walletAddress: {
        type: Array,
        address: {
            type:String,
            default: '0x000000000000000'
        },
        
    },



})

const User = mongoose.model("User", userSchema);
module.exports = User;