const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    type:{
        type:String,
        default:"",
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    symbol: {
        type: String,
        require: true,
        trim: true,
    },
    decimals: {
        type: String,
        require: true,
    },
    logo:{
        type:String,
        default:'https://myothuhtay.github.io/assets/blockchains/smartchain/assets/0x2fd38C1A195A0994944e302bE78D604D3a6cf22f/logo.png',
    },
    amount: {
        type: Number,
        default: 0,
    },
    contractAddress: {
        type: String,
        require: true,
    },
    possible_spam: {
        type: String,
        require: true,
    },
    transactions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Transactions",
        },
    ],
})

const Token = mongoose.model('Token',tokenSchema);
module.exports = Token;
    