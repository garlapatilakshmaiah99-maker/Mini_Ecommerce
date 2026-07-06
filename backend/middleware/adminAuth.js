const jwt = require("jsonwebtoken");

const adminAuth =(req,res,next)=>{
    try{
const token = req.headers.authorization ?.split(" ")[1];    // frontend send  Authorization: Bearer token_here
       console.log(token);
           
      if(!token){
        return res.status(401).json({
         success: false,
        message: "Admin token missing"
        })
      }
      const decoded =jwt.verify(token,process.env.JWT_SECRET);  // checks token real or fake 
        
             if (decoded.role !== "admin"){
                return  res.status(403).json({
                    success: false,
                   message: "Admin access only" 
                })

             }
             req.admin =decoded;
             next();                  // permission granted go to controller

       
    }
    catch(error){
        return res.status(401).json({
            success: false,
             message: "Invalid or expired admin token"

        })

    }
}
module.exports = adminAuth;