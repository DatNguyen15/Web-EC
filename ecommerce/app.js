const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
// import router
const authRouters = require("./routes/auth");
const userRouters = require("./routes/user");
const categoryRouters = require("./routes/category");
const productRouters = require("./routes/product");
const braintreeRouters = require("./routes/braintree");
const orderRouters = require("./routes/order");

//app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

//middlaware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//routes middlaware
app.use("/api", authRouters);
app.use("/api", userRouters);
app.use("/api", categoryRouters);
app.use("/api", productRouters);
app.use("/api", braintreeRouters);
app.use("/api", orderRouters);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
