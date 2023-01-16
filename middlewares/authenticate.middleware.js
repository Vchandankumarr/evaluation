const jwt=require("jsonwebtoken")


const authentication=(req,res,next)=>

{
    const token =req.headers.authorization
    if(token){
        const verifed_token=jwt.verify(token,"masai")
        if(verifed_token)
        {
            const userID=verifed_token.userID
            console.log(userID)
            req.body.userID=userID
            next()
        }
        else{
            res.send({"message":"please login first"})
        }
    }
    else{
        res.send({"message":"please login first"})
    }
}

module.exports={
    authentication
}