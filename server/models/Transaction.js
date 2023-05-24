// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const transactionSchema = mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number,
    },
}, {timestamps: true});


//Model

const transactionModel = mongoose.model('Transaction', transactionSchema);


module.exports = {
    transactionModel,
}