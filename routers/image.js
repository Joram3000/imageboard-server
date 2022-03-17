const Image = require("../models").image;

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
  const plaatje = await Image.findByPk(plaatjeId);

  res.json(plaatje.url); //showt alleen maar de URL
});

//NU MOET JE AUTORIZEREN
router.get("/messy/", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

// http :4000/images/auth/messy Authorization:"Bearer $2b$10$08fgfQpBVUeOFU9UWOP15O48EoIS1XUW7SYjFtNU/c0vs8LWuchDe"

module.exports = router;
