const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
 review : [{
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
      },
  product: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Item' 
      },
  comment: String,
  rating: Number,
}]
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
