const reviewRoutes = require("express").Router();
const  { addReview , editReview} = require("../controllers/ReviewsController")
const {protect} = require('../middleware/AuthMiddleware')

reviewRoutes.post('/:id/add' ,protect, addReview)



module.exports = reviewRoutes