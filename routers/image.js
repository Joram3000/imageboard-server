const { toJWT, toData } = require("../auth/jwt");
const Image = require("../models").image;
const bcrypt = require("bcrypt");
const { Router } = require("express");
const router = new Router();

//POST EEN PLAATJE TITLE EN URL
router.post("/", async (req, res, next) => {
  try {
    const url = req.body.url;
    if (!url || url === " ") {
      res.status(400).send("Je moet wel een goede url opgeven hondezak");
    } else {
      const imagePost = await Image.create(req.body);
      res.json(imagePost);
    }
  } catch (e) {
    next(e);
  }
});

//SHOW ALLE IMAGES
router.get("/", async (req, res, next) => {
  const plaatjes = await Image.findAll();
  res.json(plaatjes);
});

//SHOW 1 IMAGE
router.get("/:id", async (req, res, next) => {
  const plaatjeId = parseInt(req.params.id);
  if (!plaatjeId) {
    res.status(400).send("Should be a integer");
  }
  const plaatje = await Image.findByPk(plaatjeId);
  if (!plaatje) {
    res.status(404).send("Not found");
  } else {
    res.json(plaatje.url); //showt alleen maar de URL
  }
});

//NU MOET JE AUTORIZEREN
router.get("/bla/messy", async (req, res) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[2]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials???",
    });
  }
});

// http :4000/images/bla/messy Authorization:"Bearer $2b$10$DK3OQUanec1SQ5ipiWOlYu.BqMHsK4XupAJIpvVHpWEuGEHcBweAy"
// http :4000/images/bla/messy Authorization:"Bearer $2b$10$Ytq/cK4mqLIUlT9glSoEwuDX7JYBtA.AUtbeo.zlp.zXcUD.jfSXS"
// http :4000/images/bla/messy Authorization:"Bearer $2b$10$XeCr6Z.rzPN4HLfR5FdeouCzEoR92zaMcNVY851L6.e8blb.JEPWK"

module.exports = router;
