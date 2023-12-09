const userRoutes = require("express").Router();
const  { registerUser,LoginUser,getById , editUser , deleteUser, getAll} = require("../controllers/UserController")
const {protect} = require('../middleware/AuthMiddleware')

userRoutes.post("/register" , registerUser);

userRoutes.post("/login" , LoginUser);

userRoutes.get('/find' , protect ,getById)

userRoutes.put('/edit' , protect , editUser)
userRoutes.delete('/delete' , protect , deleteUser)
userRoutes.get('/all', protect ,getAll)

module.exports = userRoutes;
