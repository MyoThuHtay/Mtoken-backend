const express = require('express');
const User = require('../model/users');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with email already exit!" });
        }
        const hashPassword = await bcrypt.hash(password, 8);
        let ids =await User.find().cursor().toArray();
        let id = 0;
        if(ids.length > 0) {
            id = ids.length+1 ;
            console.log(id);
        }
        
        let user = new User({
            _id:new mongoose.Types.ObjectId(id),
            name,
            email,
            password: hashPassword,
        });
        user = await user.save();
        res.json(user);
        console.log(user);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User with email does not exit!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password!" });
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);
        const isVerify = jwt.verify(token, 'passwordKey');
        if (!isVerify) return res.json(false);
        const user = await User.findById(isVerify.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

//get user data
authRouter.get('/' , auth ,async (req,res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc,token:req.token});
});

module.exports = authRouter;
