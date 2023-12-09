const User = require("../models/userModel");
const Item = require("../models/itemModel");
const Review = require("../models/reviewsModel");

const addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const user = await User.findById(req.user.id);
    const itemId = req.params.id;
    const product = await Item.findById(itemId);

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found.',
      });
    }

    if (!product) {
      return res.send({
        success: false,
        message: 'Product not found',
      });
    }

    if (!comment && !rating) {
      return res.send({
        success: false,
        message: 'Enter required data',
      });
    }

    const existingReview = await Review.findOne({
      user: user._id,
      product: product._id,
    });

    if (existingReview) {
      return res.send({
        success: false,
        message: 'User has already reviewed this product',
      });
    }

    const review = await Review.create({
      user: user._id,
      product: product._id,
      comment,
      rating,
    });

    if (review) {
      return res.json(review);
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
};
