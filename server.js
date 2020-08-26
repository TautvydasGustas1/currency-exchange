const express = require("express");
const app = express();
const connectDB = require("./config/db");

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Test route
app.get("/api/", (req, res) => res.send("API RUNNING"));

//Defined routes
app.use("/api/fetch", require("./routes/api/fetch"));

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
