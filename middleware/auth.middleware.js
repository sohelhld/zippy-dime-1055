const jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, 'masai', async(err, decoded)=> {
                if(decoded){
                    req.body.userID = decoded.userID
                    next()
                }else{
                    res.send({"msg":"please login"})
                }
          });
    }else{
        res.status(400).send({"msg":"please login"})
    }
}

module.exports={
    auth
}