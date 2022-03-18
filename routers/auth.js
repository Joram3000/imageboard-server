const bcrypt = require("bcrypt");
const User = require("../models").user;
const { Router } = require("express");
const router = new Router();

router.post("/signup", async (req, res, next) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    res.status(400).send("Please provide an email and password and fullName");
  } else {
    try {
      const new_User = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.send(new_User);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrongwith the making of the user");
      next(e);
    }
  }
});

//LET OP URLTIE//POST EEN NIEUWE USER NOG MOOIER OPGESCHREEN
router.post("/new2", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
