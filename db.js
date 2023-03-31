
const mongoose = require('mongoose');
require("dotenv").config()

const connected = mongoose.connect(process.env.mongoURL)

module.exports={
    connected
}