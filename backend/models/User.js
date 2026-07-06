//  User schema/table structure

const mongoos = require("mongoose");

const userSchema = new mongoos.Schema({
    name :{
        type:String,
        required:true,
    } ,
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password :{
           type:String,
           required:true, 
           
    },
    role :{
        type : String,
        enum : ["user","admin"],
        default :"user"
    } 

},
{timestamps:true})

const User =mongoos.model("user",userSchema);  // creating table (model) for mogoDB

module.exports = User