const axios = require("axios");
const dotenv = require("dotenv");
const Coins = require("../model/coins");
const Transactions = require("../model/Transactions");
const User = require("../model/users");
dotenv.config();

const btcUri = process.env.BTC_URI;
const Btc = async (address, userEmail) => {
  try {
    const user = await User.findOne({ userEmail });
    const userId = user._id;
    const transactions = await axios.get(`${btcUri}${address}`);
    const name = "Bitcoin";
    const symbol = "BTC";
    const decimals = "8";
    const logo =
      "https://myothuhtay.github.io/assets/blockchains/bitcoin/info/logo.png";
    const balance = transactions.data.final_balance;
    const type = "Coin";
    let coin;
    let tx = [];
    let fromAddress = "";
    let toAddress = [];
    let amount = 0;
    let blockNumber;
    let timeStamp;
    let txHash;
    let txId = [];
    let gasPrice;
    tx = transactions.data.txs;
    for (let i = 0; i < tx.length; i++) {
      fromAddress = tx[i].inputs[0].prev_out.addr;
      amount = tx[i].inputs[0].prev_out.value;
      toAddress =
        tx[i].inputs[0].prev_out.addr == address
          ? tx[i].out.map((addr) => addr.addr)
          : address;

      blockNumber = tx[i].block_height || null;
      timeStamp = tx[i].time || Date.now();
      txHash = tx[i].hash || "";
      gasPrice = tx[i].fee;
      txs = await Transactions.findOne({ txHash: tx[i].hash });
      if (!txs) {
        txs = new Transactions({
          coinName: name,
          blockNumber,
          timeStamp,
          txHash,
          fromAddress,
          toAddress,
          amount,
          gasPrice,
        });
        txs = await txs.save();
        

        
      }
      txs = await Transactions.findOne({ txHash: tx[i].hash });
      txId.push(txs._id);
    }

    
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
        transactions: txId,
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
          transactions: txId,
        },
      },
      { upsert: true }
    );

    coin = await Coins.findOne({ name: name });
    return coin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Btc;
