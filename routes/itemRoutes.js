const ItemRouters = require("express").Router();
const {
  getAll,
  getById,
  AddItem,
  editItem,
  deleteItem,
} = require("../controllers/ItemController");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
ItemRouters.get("/all", getAll);
ItemRouters.get("/getById/:id", getById);
ItemRouters.post("/add", multer({ storage: storage }).single("file"), AddItem);
ItemRouters.put("/edit/:id", editItem);
ItemRouters.delete("/delete/:id", deleteItem);

module.exports = ItemRouters;
