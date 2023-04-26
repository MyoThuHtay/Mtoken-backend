const mongoose = require("mongoose");

const coinsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: [
    {
      type: String,
      require: true,
    },
  ],
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
  logo: {
    type: String,
    default: "",
  },
  amount: {
    type: String,
    default: "0",
  },
  type: {
    type: String,
    require: true,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
});

const Coins = mongoose.model("Coins", coinsSchema);
module.exports = Coins;
