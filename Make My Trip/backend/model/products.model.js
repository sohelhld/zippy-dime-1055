

const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    "image":String,
    "from":String,
    "To":String,
    "price":Number,
    "departure_date":String,
    "departure_time":String,
    "Arival_time":String,
    "return_date":String,
    "traveller ":Number,
    "class":String,
    "company":String,
    "userID":String

},{
    versionKey:false
})

const productModel = mongoose.model("product",productSchema)

module.exports={
    productModel
}
