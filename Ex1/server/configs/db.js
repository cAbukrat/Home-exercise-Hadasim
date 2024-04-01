const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/HMO_DB')
    .then(() => console.log('connected to HMO_DB!'))
    .catch((error) => console.log(error))
}

module.exports = connectDB;