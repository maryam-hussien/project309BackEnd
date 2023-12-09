const express = require('express');
const seachRouter = express.Router();
const Product = require('../models/itemModel');

seachRouter.get('/:query', async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.query), 'gi');

    const products = await Product.find({ name: regex });

    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = seachRouter;
