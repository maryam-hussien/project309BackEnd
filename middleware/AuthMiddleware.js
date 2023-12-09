const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const protect = async(req , res , next) => {
let token 
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
  try {
    token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password') 
    next()
    } catch (error) {
    console.log(error);
    res.send({
      message: "not Authorized",
    });
  }
}
if (!token) {
  res.send({
    message: "not Authorized , no token",
  });
}
}

module.exports = {protect}