const mongoose=require("mongoose")


const createpostschema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String,
})

const Createpostmodel=mongoose.model("post",createpostschema)


module.exports={
    Createpostmodel
}