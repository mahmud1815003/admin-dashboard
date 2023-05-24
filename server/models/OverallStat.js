// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require("mongoose");

//Schema
const overAllStatSchema = mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
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
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

//Model

const overAllStatModel = mongoose.model("OverallStat", overAllStatSchema);

module.exports = {
  overAllStatModel,
};
