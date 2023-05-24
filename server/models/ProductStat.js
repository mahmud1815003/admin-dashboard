// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require("mongoose");

//Schema

const prodcutStatSchema = mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSold: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Model

const productStatModel = mongoose.model("ProductStat", prodcutStatSchema);

module.exports = {
  productStatModel,
};
