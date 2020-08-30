const { v4: uuidv4 } = require("uuid");
const Logger = require("../models/Logger");
module.exports = async function (req, res, next) {
  try {
    //Check if user has userID cookie if not generate a cookie
    const userID = req.cookies["userID"];
    if (!userID) {
      const userID = uuidv4();
      res.cookie("userID", userID);

      //Log that new user entered a website
      const message = "New user entered a website";
      await Logger.create({ message, userID });
    } else {
      //Log user requested routes
      let message = `User used - ${req.path}`;
      if (req.query.from || req.query.to) {
        message = `User tried to exchange ${req.query.from} to ${req.query.to}`;
      }
      await Logger.create({ message, userID });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Something went wrong" });
    console.log(err);
  }
};
