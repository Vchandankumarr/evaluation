const mongoose=require("mongoose")


const createuserschema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
})

const Createusermodel=mongoose.model("user",createuserschema)


module.exports={
    Createusermodel
}


// {
//     "name":"vinay",
//   "emai":"vini@gmail.com",
//   "gender":"Male",
//   "password":"vini@123"
//   }