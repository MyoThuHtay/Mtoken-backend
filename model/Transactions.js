const mongoose = require('mongoose');

const transactions = mongoose.Schema({
    coinName:{
        type:String,
        required:true,
    },
    blockNumber:{
        type:String,
        required:true,
    },
    timeStamp:{
        type:Date,
        required:true,
    },
    txHash:{
        type:String,
        require:true,
    },
    fromAddress:{
        type:String,
        require:true,
    },
    toAddress:[{
        type:String,
        require:true,
    }],
    amount:{
        type:Number,
        require:true,
    },
    txreceipt_status:{
        type:String,
        default:'1'
    },
    gasPrice:{
        type:String,
        require:true,
    },
    gasUsed:{
        type:String,
        require:true,
    },
})

const Transactions = mongoose.model('Transactions',transactions);
module.exports = Transactions;