const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, default: 1 },
            price: Number,
            total: Number
        }
    ],
   
}
,
{
  timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);
