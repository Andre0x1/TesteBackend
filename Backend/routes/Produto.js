const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto/Produto");

router.post("/", async (req, res) => {
  try {
    const { nome, preco, isDisponivel } = req.body;
    const newItem = new Produto({ nome, preco, isDisponivel });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar Produtos" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Produtos = await Produto.find();
    res.json(Produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Produtos" });
  }
});

module.exports = router;
