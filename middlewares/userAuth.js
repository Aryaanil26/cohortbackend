const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        
        const { token } = req.cookie;
        if(!token) {
            return res.status(401).json({ success: false, message:"user not authorized" });
        }
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({success:false,message: 'user not authorized'})
        }
         
        req.user = tokenVerified;

        next()
    } catch (error) {
        console.log(error);
        res.status(error.statusCode  || 500).json({message: error.message || "internal server error"})
    }
};

module.exports = { userAuth };

