const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Connect to DB
connectDB();

//Init Middleware
app.use(cookieParser());

//Test route
app.get("/api/", (req, res) => res.send("API RUNNING"));

//Defined routes
app.use("/api/exchange", require("./routes/api/exchange"));

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
