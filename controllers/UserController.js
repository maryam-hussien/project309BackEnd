const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bycrpt = require("bcryptjs")
const cloudinary = require('../utils/cloudinary');


const registerUser = async (req, res) => {
  try {
    const { name , email , password , role , profilePicture , address , phone}  = req.body
    if(!name || !email || !password){
      return res.send({
        success: false,
        message: "All Name , Email and  Password are required",
      });
    }
    //check if users exists
    const userExist= await User.findOne({email})
    if (userExist){
      return res.send({
        success: false,
        message: "User already existed",
      });
    }
    //hash passowrd
    const salt = await bycrpt.genSalt(10)
    const hashPassword =await bycrpt.hash(password , salt)
    //create user
    const user = await User.create({
      name,
      email,
      password:hashPassword,
      role,
      profilePicture,
       address ,
       phone
    })
     if (user){
      return res.send({
        success: true,
        message: "User created successfully",
        _id: user.id,
        name: user.name,
        email: user.email,
        address :user.address ,
       phone:user.phone,
       token: generateToken(user._id),
    })

      }
     
     else{
      return res.send({
        success: false,
        message: " Invalid User",
      });
     }

  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


const LoginUser = async (req, res) => {
  try {
    const { email , password } = req.body
    if(!email || !password){
      return res.send({
        success: false,
        message: "Both Email and Password are required",
      });
    }
    //check if users exists
    const user= await User.findOne({email})
    if (user && await bycrpt.compare(password , user.password)){
      return res.send({
        success: true,
        message: "Logged In",
          _id: user.id,
          name: user.name,
          email: user.email,
          address :user.address ,
          phone:user.phone,
          token: generateToken(user._id),      });
    }

     else{
      return res.send({
        success: false,
        message: " Invalid User",
      });
     }

  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//access private
const getById = async (req , res) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user){
      return res.send({
        success: false,
        message: " not foundUser",
      });
    }
    res.send(user); 
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


//generate jwt 
const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d'
 })
}

const editUser = async(req , res) => {
  try{
  //   const result = await cloudinary.uploader.upload(image, {
  //     folder: "products",
  // })
  const {name , image , phone , address} = req.body

  const update = {   
    name,
    phone ,
     address,
  //   image: {
  //     public_id: result.public_id,
  //     url: result.secure_url
  // }, 
 }

   const userr = await User.findByIdAndUpdate(req.user.id ,update, {new : true})
   if(!userr){
    return res.send({
      success: false,
      message: " not authorized User",
    });
   }
   return res.send({
    success: true,
    message: "Edit sucessfully",
      _id: userr.id,
      name: userr.name,
      email: userr.email,
      address :userr.address ,
      phone:userr.phone,
          });
  }catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

const deleteUser = async(req , res) => {
  try{
    const userr = await User.findByIdAndDelete(req.user.id)

    if(!userr){
      return res.send({
       success: false,
       message: " not authorized User",
     });
    }
    return res.send({
      success: true,
      message:"deleted succesfully",
    });
   }catch (error) {
     res.send({
       success: false,
       message: error.message,
     });
   }
}

const getAll =  async (req , res) => {
  try {   
   const userr  = await User.findById(req.user.id)

    if(userr.role == "admin"){
      const all = await User.find()
      return  res.json(all)
    }
    else{
      return res.send({
        success: false,
        message: "only admins can view all data",
      });
    }
  }catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
  }
}

module.exports = {
  registerUser,
  LoginUser,
  getById,
  editUser,
  deleteUser,
  getAll
};