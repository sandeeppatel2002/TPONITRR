const router = require("express").Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  const newComp = new Company(req.body);
  try {
    const savedComp = await newComp.save();
    res.status(200).json(savedComp);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const comps = await Company.find();
    res.status(200).json(comps);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
