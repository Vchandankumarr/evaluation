const express=require("express")
const {Createpostmodel}=require("../models/posts.model")

const postrouter=express.Router()


postrouter.get("/", async(req,res)=>
{
    try {
        let posts = await Createpostmodel.find()
        res.send(posts)
    } catch (error) {
        
    }
    res.send("all posts")
})


postrouter.post("/create",async(req,res)=>
{
    const payload=req.body
    

    try {
        const new_post= await Createpostmodel(payload)
        await new_post.save()
        res.send({"message":"Created new post"})
    } catch (error) {
        res.send({"message":"Cannot create new post"})
    }
})

postrouter.patch("/update/:id",async(req,res)=>
{
    const payload=req.body;
    const ID=req.params.id;
    const post=await Createpostmodel.findOne({_id:ID});

    const post_userID=post.userID;
    const userID_jwt=req.body.userID
    try {
        if(userID_jwt==post_userID)
        {
            await Createpostmodel.findByIdAndUpdate({_id:ID},payload)
            res.send({"message":"post updated"})
        }
        else{
            res.send({message:"your not authorized to update"})
        }
    } catch (error) {
        res.send("cannot update the post")
    }
})

postrouter.delete("/delete/:id",async(req,res)=>
{
    
    const ID=req.params.id;
    const post=await Createpostmodel.findOne({_id:ID});

    const post_userID=post.userID;
    const userID_jwt=req.body.userID
    try {
        if(userID_jwt==post_userID)
        {
            await Createpostmodel.findByIdAndDelete({_id:ID})
            res.send({"message":"post deleted"})
        }
        else{
            res.send({message:"your not authorized to delete"})
        }
    } catch (error) {
        res.send("cannot update the delete")
    }
})

module.exports={
    postrouter
}