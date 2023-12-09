const CartRoutes = require("express").Router()
const { AddItem } = require( "../controllers/cartContoller")


CartRoutes.post("/add/:id" , AddItem)


module.exports = CartRoutes