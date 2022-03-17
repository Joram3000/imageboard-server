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

module.exports = router;
