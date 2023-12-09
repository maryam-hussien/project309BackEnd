const mongoose = require("mongoose")

const itemSchema = mongoose.Schema(
{
  name:{
    type: String,
    required: true,
  },
  type : {
    type: String,
    required: true,
  },
//   image: {
//     public_id: {
//         type: String,
//     },
//     url: {
//         type: String,
//     }
// },
   price : {
    type: String,
    required: true,
   },
   size : {
    type: String,
   },
   description : {
    type: String,
   },

},
{
  timestamps: true,
}
)

const Item = mongoose.model("item" , itemSchema)
module.exports = Item