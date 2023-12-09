const Item = require("../models/itemModel");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");
const upload = require("../middleware/multer");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const item = await Item.find();
    if (!item) {
      return res.send({
        success: false,
        message: "no items",
      });
    }
    return res.json(item);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
const getById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const item = await Item.findById(id);
    if (!item) {
      return res.send({ success: false, message: "item not found" });
    }
    res.json(item);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
const AddItem = async (req, res) => {
  try {
    const { name, type, price, size, description } = req.body;

    console.log(req.body);
    // if (!req.file) {
    //   return res.send({
    //     success: false,
    //     message: "No file uploaded",
    //   });
    // }
    // const image = req.file.path;
    // console.log(req.file.path);
    // if (image) {
    //   const result = await cloudinary.uploader.upload(image, {
    //     folder: "products",
    //   });
    //   console.log("Cloudinary Upload Result:", result);
    //   if (!result || result.error) {
    //     console.error(
    //       "Error uploading image to Cloudinary:",
    //       result && result.error
    //     );
    //     return res.send({
    //       success: false,
    //       message: "Error uploading image to Cloudinary",
    //     });
    //   }
    // }
    if (!name || !type || !price) {
      return res.send({
        success: false,
        message: "type , price and image are required",
      });
    }

    const item = await Item.create({
      name,
      type,
      price,
      // image: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
      size,
      description,
    });
    if (item) {
      return res.send({
        success: true,
        message: "product created successfully",
        _id: item.id,
        name: item.name,
        type: item.type,
        price: item.price,
        description: item.description,
        size: item.size,
      });
    }
  } catch (error) {
    console.log("here");
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
const editItem = async (req, res) => {
  try {
    const { name, type, price, image, size, description } = req.body;

    const id = req.params.id;
    console.log(id);
    // const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    // const result = await cloudinary.uploader.upload(image, {
    //   folder: "products",
    // });
    const update = {
      name,
      type,
      price,
      // image: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
      size,
      description,
    };

    // if (!isValidObjectId) {
    //   return res.send({ success: false, message: "Invalid Item ID" });
    // }
    if (!type || !price) {
      return res.send({
        success: false,
        message: "type , price and image are required",
      });
    }
    const item = await Item.findByIdAndUpdate(id, update, { new: true });
    if (!item) {
      return res.send({ success: false, message: "book not found" });
    }
    return res.json(item);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.json({ message: "Invalid item ID" });
    }
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.json({ success: false, message: "item not found" });
    }
    return res.send({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  AddItem,
  editItem,
  deleteItem,
};
