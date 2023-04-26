const axios = require('axios');
const dotenv = require('dotenv');
const Coins = require("../model/coins");
const User = require('../model/users');
dotenv.config();

const ltcUri = process.env.LTC_URI;
const api = process.env.CHAINZ_API;
const Ltc = async (address,userEmail) => {

    try {
        const user = await User.findOne({ userEmail });
        const userId = user._id;
        const transactions = await axios.get(`${ltcUri}${address}&key=${api}`);
        const name = "Litecoin";
        const symbol = "LTC";
        const decimals = "8";
        const logo =
          "https://myothuhtay.github.io/assets/blockchains/litecoin/info/logo.png";
        const balance = transactions.data.final_balance;
        const type = "Coin";
        let coin;
        coin = await Coins.findOne({ name: name });
        if (!coin) {
          coin = new Coins({
            user: userId,
            address: address,
            name,
            symbol,
            decimals,
            logo,
            amount: balance,
            type,
          });
          coin = await coin.save();
        }
    
        coin = await Coins.updateMany(
          { name: name },
          {
            $set: {
              user: userId,
              address: address,
              name,
              symbol,
              decimals,
              logo,
              amount: balance,
              type,
            },
          },
          { upsert: true }
        );
    
        coin = await Coins.findOne({ name: name });
        return coin;   
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = Ltc;