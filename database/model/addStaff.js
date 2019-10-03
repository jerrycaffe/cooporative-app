const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const AddStaffSchema = new mongoose.Schema({
    username: {
    type: String,
    required:true
    },
    fullname: {
    type:String,
    required: true
    },
    email: {
        type:  String,
        required: true,
        unique: true
      },
    password: String,
    title: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: String,
    gender: String,
    dob: Date,
    monthlyDeduction: Number,
    accountNumber: Number,
    bank: String,
    passport: String
    
})

AddStaffSchema.pre('save', function(next){
    const adddStaff = this

    bcrypt.hash(adddStaff.password, 10, function(error, encrypted){
    adddStaff.password = encrypted
    next()
    })

})
const AddStaff = mongoose.model('AddStaff', AddStaffSchema)

module.exports = AddStaff