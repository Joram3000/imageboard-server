const User = require("../models").user;
const { Router } = require("express");
const router = new Router();

//POST EEN NIEUWE USER
router.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email || email === " ") {
      res.status(404).send("Je moet wel een email adres geven ");
    } else {
      const newUser = await User.create(req.body);
      res.json(newUser);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//POST EEN NIEUWE USER NOG MOOIER OPGESCHREEN
router.post("/newuser", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await User.create({
        email,
        password,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
