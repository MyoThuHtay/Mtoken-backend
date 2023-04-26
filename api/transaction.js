const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const Coins = require("../model/coins");
const Transactions = require("../model/Transactions");

const tx = express.Router();
dotenv.config();
// transactions.get('btcTransactions', async (req, res) => {
//     const address = req.query.address;
    
//     const btcTransactionsUri = process.env.BTC_URI;
//     try {
//         const transactions = await axios.get(`${btcTransactionsUri}${address}`);
//         if (transactions.status !== 200) {
//             res.status(transactions.status).json({
//                 message: "error"
//             });
//         }
//     res.status(200).json(transactions.data);
        
//     } catch (error) {
//         res.status(400).send(error.message);
//     }

// })

tx.get('/api/bsctransactions', async (req, res) => {
    
    const address = req.query.address;
    const apikey = process.env.BSC_SCAN_API_KEY;
    const uri = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(uri);
        console.log(transactions.status);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

tx.get('/api/transactions', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.BSC_SCAN_API_KEY;
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=1&offset=latest&startblock=0&endblock=999999999&sort=dsc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(uri);
        console.log(transactions.status);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

tx.get('/api/ethereumTransactions', async (req, res) => {
    const address = req.query.address;
    const apikey = process.env.ETHER_SCAN_API;
    const ethTransactionsUri = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(ethTransactionsUri);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
tx.get('/api/ethTransactions', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.ETHER_SCAN_API;
    const uri = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&page=1&offset=latest&startblock=0&endblock=999999999&sort=dsc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(uri);
        console.log(transactions.status);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

tx.get('/api/maticTransactions', async (req, res) => {
    const address = req.query.address;
    const apikey = process.env.POLYGON_SCAN_API;
    const maticTransactionsUri = `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(maticTransactionsUri);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
tx.get('/api/polygonTransactions', async (req, res) => {
    const contractaddress = req.query.contractaddress;
    const address = req.query.address;
    const apikey = process.env.POLYGON_SCAN_API;
    const uri = `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${contractaddress}&address=${address}&startblock=0&endblock=99999999&page=1&offset=latest&sort=asc&apikey=${apikey}`;
    try {
        const transactions = await axios.get(uri);
        console.log(transactions.status);
        if (transactions.status !== 200) {
            res.status(transactions.status).json({
                message: "error"
            });
        }
        res.status(200).json(transactions.data.result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = tx;
