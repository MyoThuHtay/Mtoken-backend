const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Moralis = require("moralis").default;
const authRouter = require("./api/auth_api");
const coinRouter = require("./api/coin_api");
const tx = require("./api/transaction");
const PORT = process.env.PORT || 3000;

const app = express();
const DB = process.env.DB ;

app.use(express.json());
app.use(authRouter);
app.use(coinRouter);
app.use(tx);
const startServer = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  }).then(() => {
    console.log("connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
};
startServer();
  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB)
    .then(() => {
      console.log("connection Successful");
    })
    .catch((e) => {
      console.log(e);
    });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
  });

