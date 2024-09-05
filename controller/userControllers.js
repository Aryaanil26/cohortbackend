const { user }= require("../model/userModel");

const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, profilePic } =req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                message: "all fields required",
            });
        }
        const isUserExist = await user.findOne({ email});
        if (isUserExist) {
            return res.status(400).json({ message: "user already exist"});
        }

    } catch (error) {
        console.log(error);
    }
};