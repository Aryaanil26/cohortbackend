const { Admin }= require("../model/adminModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const adminSignup = async (req, res, next) => {
    try {
        const { role, email, password} = req.body;
        if (!role || !email || !password) {
            res.status(400).json({ success: false, message: "all fields required" });
        }
        const isAdminExist = await Admin.findOne({ email });

        if (isAdminExist) {
            return res.status(400).json({ message: "user already exist"});
        }
        
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        

        const newAdmin = new Admin({ role, email, password, hashedPassword});
        await newAdmin.save();

        const token = generateToken(newAdmin._id, 'admin');

     res.cookie("token", token);
     res.json({ success:true, message: "admin created successfully"});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
    }
};


const adminLogin = async (req, res, next) => {
    try {
        const{ email , password} = req.body;
        if( !email ||!password){
            res.status(400).json({message: "all fields required"});
        }

        const adminExist = await Admin.findOne({ email });
        if (!adminExist) {
            return res.status(404).json({ success: false, message: "admin does  not exist"});
        }
      
        const passwordMatch = bcrypt.compareSync(password, adminExist.password);
        if(!passwordMatch)  {
            return res.status(401).json({message: "admin not authorized" });
        }


       const token = generateToken(adminExist._id, 'admin');

     res.cookie("token", token);
     res.json({ success:true, message: "admin login successfull"});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
    }
};

const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.json({ message: "admin logout success", success: true});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
    }
};
const adminProfile = async (req, res, next) => {
try {
     const mentor = req.user;
    //  console.log(user, "========user");

    const { id } = req.params;
    const  mentorData = await Mentor.findOne({_id: mentor.id });
    res.json({ success: true, message: "mentor data fetched", data: mentorData });

    } catch (error) {
        console.log(error);
        res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
    }
};



const checkAdmin = async (req, res, next) => {
    try {
          const { user} = req;
          if (!user){
            res.status(401).json({success:false,message:'user not authorized'})
          }
        res.json({ success: true, message: "user data fetched", data: userData });
    
        } catch (error) {
            console.log(error);
            res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
        }
    };



    module.exports = { adminSignup, adminLogin, adminLogout, adminProfile};