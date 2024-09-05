const { user }= require("../model/userModel");
const bcrypt = require('bcrypt');

const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, profilePic } =req.body;
        if (!name || !email || !password) {
            res.status(400).json({ success:true, message: "all fields required"});
        }
        const isUserExist = await user.findOne({ email});

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist"});
        }
        
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        console.log(hashPassword,'=====hashedpassword');

    } catch (error) {
        console.log(error);
    }
};