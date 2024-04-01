const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    fName : String,
    lName : String,
    IDcard : String, 
    address : {city : String, street : String, number : Number },
    dateOfBirth : {type: Date, required: false },
    phone : String,
    mobilePhone: String,
    coronaVaccines : { date1 : {type: Date, required: false }, date2 : {type: Date, required: false }, date3 : {type: Date, required: false }, date4 : {type: Date, required: false } },
    sickInCorona : { isPositive : Boolean, startDate: {type: Date, required: false }, endDate: {type: Date, required: false } },
    profileImage: String
})

const Member = mongoose.model('members', memberSchema)

module.exports = Member