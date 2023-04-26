const mongoose = require('mongoose');

const walletAddress = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addresses:{
        type:String,
        require:true,
    },
    coins:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coins'
        
    }
})

const WalletAddress = mongoose.model('walletAddress',walletAddress);
module.exports = WalletAddress;