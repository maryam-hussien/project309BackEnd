const Order = require("../models/orderModel")
const User = require("../models/userModel")
const generateToken = require("../controllers/UserController")
const Item = require("../models/itemModel")

const getAll = async (req , res ) => {
  try {   
    const userr  = await User.findById(req.user.id)
     if(userr){
       const all = await Order.find()
       res.status(200).json(all)
     }
     else{
       res.status(403).send({
         success: false,
         message: "only users can view all orders",
       });
     }
   }catch (error) {
       res.send({
         success: false,
         message: error.message,
       });
   }
}

const addOrder = async(req , res) => {
  try {
    const userr  = await User.findById(req.user.id)
    const id = req.params.id
    const product = await Item.findById(id)
    const { Address ,city ,phone , country} = req.body
   if (!userr) {
    return res.json({
      success: false,
      message: 'User not found.',
    });
   }
   if(!product){
     return res.send({
       success: false,
       message: "product not found",
     });
   }
    if( !Address || !city || !phone || !country  ){
      return res.send({
        success: false,
        message: "enter required data",
      });
    }
    const order = await Order.create({
      Address,
      city,
      phone,
      country,
      user: req.user.id,
      product: [{
        item: product.item,
        name: product.name,
        type: product.type,
        image: product.image,
        price: product.price,
        size: product.size,
        description: product.description,
      }],
    })
    if (order){
      return res.json(order)
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

const editOrder = async(req , res) => {
 try{ const userr  = await User.findById(req.user.id)
    const id = req.params.id
    const { shippingAddress1 ,city ,phone , country} = req.body
    const update = req.body
   if (!userr) {
    return res.json({
      success: false,
      message: 'User not found.',
    });
   }
    const order = await Order.findByIdAndUpdate(id , update ,  { new: true })
     if(!order){
      return(res.send({success: false, message : 'order not found'}))
    }
    return res.json(order)
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}
const deleteOrder = async (req , res) => {
try{
  const id = req.params.id
  const userr  = await User.findById(req.user.id)
  if (!userr) {
    return res.json({
      success: false,
      message: 'User not found.',
    });
   }
    const order = await Order.findByIdAndDelete(id)
      if(!order){
      return(res.json({  success: false, message : 'order not found'}))
    }
    return res.send({ success: true , message :'Deleted Successfully'})

  }  catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
}

}
module.exports = {
  getAll,
  addOrder,
  editOrder,
  deleteOrder
}