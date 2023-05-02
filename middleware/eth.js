const Moralis = require('moralis').default
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const User = require('../model/users');
const Coins = require('../model/coins');
//const address = "0xE887232387645C90601935FC028D0589d97942eb"
const chain = EvmChain.GOERLI;

const Eth = async (address, userEmail) => {
    try {
        const user = await User.findOne({ userEmail });
        const userId = user._id;
        const coinBalance = await Moralis.EvmApi.balance.getNativeBalance({ address, chain });
        //const token = await Moralis.EvmApi.token.getWalletTokenBalances({ address, chain });
        const name = "Ethereum";
        const symbol = "ETH";
        const decimals = "18";
        const logo = 'https://myothuhtay.github.io/assets/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png';
        const balance = coinBalance.result.balance.ether.toString();
        const type = "Coin";
        let coin ;
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
                //tokens: token.raw,
    
            });
        coin = await coin.save();
        }
        coin = await Coins.updateMany({ name: name }, {
            $set: {
                user: userId,
                address: address,
                name,
                symbol,
                decimals,
                logo,
                amount: balance,
                type,
                //tokens: token.raw,
            },
        }, { upsert: true });
        coin = await Coins.findOne({ name: name });

        return coin;
    } catch (error) {
        console.log(error);

    }
};

module.exports = Eth;