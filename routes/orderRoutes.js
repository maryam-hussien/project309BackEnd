const orderRoutes = require("express").Router();
const  { addOrder, getAll , editOrder , deleteOrder} = require("../controllers/OrderController")
const {protect} = require('../middleware/AuthMiddleware')

orderRoutes.get('/all' , protect,getAll)
orderRoutes.post('/add/:id' ,protect, addOrder)
orderRoutes.put('/edit/:id', protect , editOrder )
orderRoutes.delete('/delete/:id', protect , deleteOrder )

module.exports = orderRoutes