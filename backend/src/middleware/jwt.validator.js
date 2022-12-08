const jwt = require("jsonwebtoken");
const JWT_SECRET='IEWUBFIEUGFPIUERGF8932RY297'

const encode = async(req,res)=>{
    try {
        const {id,email} = res.user
        const token = jwt.sign({email: email,id: id,},JWT_SECRET);
        return res.status(200).send({token,message:'login success', profile: res.user,success:true});
      } catch (e) {
        return res.status(400).send({message:e.message,success:false})
      }
} 
const decode = (req, res, next) => {
    try {
      if (req.headers.authorization === void 0) {
        return res.status(403).send({message:'Unauthorized',success:false})
      }
      const accessToken = req.headers.authorization.split(' ');
      if (accessToken[0] !== 'Bearer') {
        return res.status(403).send({message:'Unauthorized',success:false})
      }
      jwt.verify(accessToken[1], JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({message:err.message,success:false})
        } else {
          res.userEmail = decoded.email;
          res.userId = decoded.id;
          next();
        }
      });
    } catch (e) {
      return res.status(400).send({message:e.message,success:false})
    }
  };

module.exports = { encode,decode };
