const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const jwt = require('jsonwebtoken');

const userSignup = async (req, res, next) => {
    try {
        console.log("signup")
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "all fields required" });
        }
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist"});
        }
        
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword)
        

        const newUser = new User({ name, email, password: hashedPassword});
        await newUser.save();
        console.log(newUser)
        const token = generateToken(newUser._id);
        
        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });
     res.json({ success:true, message: "user created successfully"});

    } catch (error) {
        console.log(error);
        next(error)
    }
};

const userLogin = async (req, res, next) => {
    try {
        console.log("login")
        const {email,password} = req.body; 
         console.log(password,"first")
        if(!email || !password){
            res.status(400).json({message:'all fields required'})
        }
        const userExist = await User.findOne({ email});
        console.log(userExist.password,"second")
        if(!userExist) {
            return res.status(404).json({success: false,message: "user does not exist"})
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        console.log(passwordMatch)
        if(!passwordMatch) {
            return res.status(401).json({message: "user not authorized" });
        }

        const token = generateToken(userExist._id);

        res.cookie("token", token);
        res.json({ success: true, message:"user login successfull"})

    }catch (error){
        console.log(error);
        res.status(error.statusCode || 500).json({message:error.message || "Internal server error"});
    }
};




// const userLogin = async (req, res, next) => {
//     try {
//         const{ email, password} = req.body;
//         if( !email ||!password){
//             res.status(400).json({message: "all fields required"});
//         }

//         const userExist = await User.findOne({ email });
//         if (!userExist) {
//             return res.status(404).json({ success: false, message: "user does  not exist"});
//         }
         
//         const passwordMatch = bcrypt.compareSync(password, userExist.password);
//         if(!passwordMatch) {
//             return res.status(401).json({ message: "user not authorized"})
//         }
          
//         const token = generateToken(userExist._id);

//      res.cookie("token", token, {
//         sameSite: "None",
//         secure: true,
//         httpOnly: true,
//     });
//      res.json({ success:true, message: "user login successfull"});

//     } catch (error) {
//         console.log(error);
//        next(error);
//     }
// };

const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.json({ message: "user logout success", success: true});

    } catch (error) {
        console.log(error);
       next(error);
    }
};
const userProfile = async (req, res, next) => {
try {
     const user = req.user;
     console.log(user, "========user");

    
    const  userData = await User.findOne({ _id: user.id });
    res.json({ success: true, message: "user data fetched", data: userData });

    } catch (error) {
        console.log(error);
      next(error)
    }
};



const checkUser = async (req, res, next) => {
    try {
          const { user} = req;
          if (!user){
            res.status(401).json({success:false,message:'user not authorized'})
          }
        res.json({ success: true, message: "user data fetched", data: userData });
    
        } catch (error) {
            console.log(error);
          next(error)
        }
    };


module.exports = { userSignup, userLogin, userLogout, userProfile, checkUser};