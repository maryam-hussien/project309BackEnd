const mongoose = require('mongoose');

const connection = mongoose
.connect(process.env.mongoDB_url)
.then(() => {
    console.log("connected to mongoDB");
}).catch((error) => {
    console.log('cant connect to mongo' + error);
})

module.exports = connection;
