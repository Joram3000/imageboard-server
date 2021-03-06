const bcrypt = require("bcrypt");
const User = require("../models").user;
const { Router } = require("express");
const router = new Router();
const { toJWT } = require("../auth/jwt");

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
