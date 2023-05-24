// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    city: String,
    State: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin',
    }
}, {
    timestamps: true,
});


//Model

const userModel = mongoose.model('User', userSchema);


module.exports = {
    userModel,
}