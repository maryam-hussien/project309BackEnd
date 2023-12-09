const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        name:{
            type: String,
          },
          type : {
            type: String,
          },
          image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
           price : {
            type: String,
           },
           size : {
            type: String,
           },
           description : {
            type: String,
           }
}],
    Address: {
        type: String,
        required: true,
    },
  
    city: {
        type: String,
        required: true,
    },
  
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})


const Order = mongoose.model("Order" , orderSchema)
module.exports = Order


