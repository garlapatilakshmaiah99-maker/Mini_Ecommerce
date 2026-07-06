// mongo-DB
//Connects MongoDB
const mongoos = require("mongoose");
const connectDB = async ()=>{
    try{
       await mongoos.connect("mongodb://localhost:27017/mini_ecommerce");
       console.log("MongoDB Connected Sucessfully");
    }catch(error){
        console.log("Connection Failed");
        console.log(error)

    }
}
module.exports = connectDB;