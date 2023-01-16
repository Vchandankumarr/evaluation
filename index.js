const express= require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const {userRouter}=require('./routes/user.router')
const {authentication}=require("./middlewares/authenticate.middleware")
const { postrouter } = require("./routes/posts.router")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>
{
    res.send("Welocome to home page")
})

app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",postrouter)


app.listen(process.env.port, async()=>
{
    try {
        await connection
        console.log("connected to data base")
    } catch (error) {
        
    }
    console.log(`server is running in server ${process.env.port}`)
})