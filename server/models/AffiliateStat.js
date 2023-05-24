// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const AffiliateStatSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
}, {timestamps: true});


//Model

const AffiliateStatModel = mongoose.model('AffiliateStat', AffiliateStatSchema);


module.exports = {
    AffiliateStatModel,
}