const express = require("express");
const { Createusermodel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const userRouter = express.Router();




userRouter.get("/", (req, res) => {
  res.send("insid users");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  const user = await Createusermodel.find({ email });
  if (user.length > 0) {
    res.send({ message: "user already exist please login" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const new_user = new Createusermodel({
            name,
            gender,
            email,
            password: hash,
          });
          await new_user.save();
          res.send({ message: "Rigesterd user" });
        }
      });
    } catch (error) {
      res.send({ message: "cannot register user" });
    }
  }
});




userRouter.post("/login", async(req,res)=>
{
    const {email,password}=req.body
        try {
            const user=await Createusermodel.find({email})
            if(user.length>0){
              bcrypt.compare(password,user[0].password,(err,result)=>
            {
                if(result){
                   const token=jwt.sign({userID:user[0]._id},"masai")
                   res.send({"message":"Login Sucessfull","token":token})
                }
                else{
                    res.send({'message':"Wrong credentials"})
                }
            })
            }
            else{
              res.send({"message":"cannot login"})
            }
            
        } catch (error) {
            res.send({"message":"cannot login"})
        }

    
})
module.exports = {
  userRouter,
};
