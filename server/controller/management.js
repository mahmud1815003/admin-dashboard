const { userModel } = require("../models/User");
const mongoose = require("mongoose");
const { transactionModel } = require("../models/Transaction");

const getAdmins = async (req, res) => {
  try {
    const admins = await userModel.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.originalUrl);
    const userWithStats = await userModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(userWithStats[0].affiliateStats.affiliateSales.map((id) => {
      return transactionModel.findById(id);
    }))

    const filteredSalesTransaction = saleTransactions.filter((transaction) => {
      return transaction !== null;
    })

    res.status(200).json({
      user: userWithStats[0],
      sales: filteredSalesTransaction,
    });

  } catch (error) {
    console.log(error.message);
    res.status(404).json(error.message);
  }
};

module.exports = {
  getAdmins,
  getUserPerformance,
};
