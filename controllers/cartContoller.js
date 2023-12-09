const Cart = require('../models/cartModel')
const Item = require("../models/itemModel")
const mongoose = require('mongoose');




const AddItem = async( req , res ) => {
  try{
    const { price , quantity ,total} = req.body

  const id = req.params.id
  const product = await Item.findById(id)
 
  if(!product){
   return res.send({
      success: false,
      message: "product not found",
    });
  }
  if( !price ){
   return res.send({
      success: false,
      message: "price is required",
    });
  }
  const cartItem = await Cart.create({
    cart : [
      {
      product,
      quantity,
      price,
      total : price*quantity,
  }
]
  })
  if (cartItem){
   return res.json(cartItem)
  }

} catch (error) {
  res.send({
    success: false,
    message: error.message,
  });
}
}

module.exports = {
  AddItem,
}