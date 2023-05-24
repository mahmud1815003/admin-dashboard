const { userModel } = require("../models/User");
const { transactionModel } = require("../models/Transaction");
const { overAllStatModel } = require("../models/OverallStat");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await transactionModel
      .find({})
      .limit(50)
      .sort({ createdAt: -1 });
    const overallStat = await overAllStatModel.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      montlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month == currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date == currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      montlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUser,
  getDashboard,
};
