// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
}, {
    timestamps: true,
});


//Model

const productModel = mongoose.model('Product', productSchema);


module.exports = {
    productModel,
}