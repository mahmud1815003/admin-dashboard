const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//Internal Imports
const { clientRouter } = require("./routes/client.js");
const { generalRouter } = require("./routes/general.js");
const { salesRouter } = require("./routes/sales.js");
const { managementRouter } = require("./routes/management.js");
const { productModel } = require("./models/Product.js");
const { productStatModel } = require("./models/ProductStat.js");
const {
  dataProductStat,
  dataOverallStat,
  dataTransaction,
  dataUser,
  dataProduct,
  dataAffiliateStat
} = require("./data/index.js");
const { userModel } = require("./models/User.js");
const { transactionModel } = require("./models/Transaction.js");
const { overAllStatModel } = require("./models/OverallStat.js");
const {AffiliateStatModel} = require('./models/AffiliateStat.js');
// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/client", clientRouter);
app.use("/general", generalRouter);
app.use("/management", managementRouter);
app.use("/sales", salesRouter);

// Mongoose Setup
const port = process.env.port || 5001;
const databaseURI = process.env.databaseURI;
mongoose
  .connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
    // userModel.insertMany(dataUser);
    // productModel.insertMany(dataProduct);
    // productStatModel.insertMany(dataProductStat);
    // transactionModel.insertMany(dataTransaction);
    // overAllStatModel.insertMany(dataOverallStat);
    // AffiliateStatModel.insertMany(dataAffiliateStat);
    app.listen(port, () => {
      console.log(`Listening on PORT ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
