const express = require("express");
const router = express.Router();
const Sacola = require("../models/Sacola/Sacola");

router.post("/", async (req, res) => {
  try {
    const { idUsuario } = req.body;

    const existingSacola = await Sacola.findOne({ idUsuario });

    if (existingSacola) {
      return res.status(409).json({ error: "Sacola já existe" });
    }
    const Sacola = new Sacola({ idUsuario });
    await Sacola.save();
    res.status(201).json(Sacola);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar Sacola" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Sacolas = await Sacola.find();
    res.json(Sacolas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Sacolas" });
  }
});

router.get("/lists/", async (req, res) => {
  try {
    const { idUsuario } = req.query;
    const Sacolas = await Sacola.find({ idUsuario });
    res.json(Sacolas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Sacolas do usuario" });
  }
});

module.exports = router;
