const express = require("express");
const router = express.Router();
const Sacola = require("../models/Sacola/Sacola");

router.post("/", async (req, res) => {
  try {
    const { idUsuario, tamanho } = req.body;

    const existingSacola = await Sacola.findOne({ idUsuario });

    if (existingSacola) {
      return res.status(409).json({ error: "Sacola já existe" });
    }
    const Sacola = new Sacola({ idUsuario, tamanho });
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

router.get("/lists/:id", async (req, res) => {
  try {
    const { idUsuario } = req.params.id;
    const Sacolas = await Sacola.find({ idUsuario });
    res.json(Sacolas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Sacolas do usuario" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { tamanho } = req.body;

  try {
    const sacola = await Sacola.findByIdAndUpdate(
      id,
      { tamanho },
      { new: true }
    );

    if (!sacola) {
      return res.status(404).json({ error: "Sacola não encontrada" });
    }

    res.json(sacola);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Sacola" });
  }
});

module.exports = router;
