const mongoose=require("mongoose")
require("dotenv").config()
console.log(process.env.mongourl)
const connection=mongoose.connect(process.env.mongourl)


module.exports={
    connection
}