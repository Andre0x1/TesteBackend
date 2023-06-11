const express = require("express");
const router = express.Router();
const SacolaProdutos = require("../models/SacolaProdutos/SacolaProdutos");

router.post("/", async (req, res) => {
  try {
    const { idSacola, idProduto, valor } = req.body;
    const id = idSacola;
    const tamanhoMaximo = 3;
    const count = await SacolaProdutos.countDocuments({ idSacola: id });

    if (count >= tamanhoMaximo) {
      return res.status(400).json({ error: "A sacola está cheia" });
    }

    const newItem = new SacolaProdutos({ idSacola, idProduto, valor });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao adicionar produto à sacola",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const Sacolas = await SacolaProdutos.find();
    res.json(Sacolas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Sacolas" });
  }
});

router.get("/produtos/:id", async (req, res) => {
  try {
    const idSacola = req.params.id;
    const Sacolas = await SacolaProdutos.find({ idSacola: idSacola });
    res.json({ Sacolas });
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter produtos da sacola" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sacola = await SacolaProdutos.findById(req.params.id);

    if (!sacola) {
      return res.status(404).json({ error: "Sacola não encontrada" });
    }

    res.json(sacola);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter sacola" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idSacola, idProduto, valor } = req.body;

  try {
    const sacola = await SacolaProdutos.findByIdAndUpdate(
      id,
      { idSacola, idProduto, valor },
      { new: true }
    );

    if (!sacola) {
      return res.status(404).json({ error: "Sacola não encontrada" });
    }

    res.json(sacola);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar sacola" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sacola = await SacolaProdutos.findByIdAndDelete(id);

    if (!sacola) {
      return res.status(404).json({ error: "Sacola não encontrada" });
    }

    res.json({ message: "Sacola excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir sacola" });
  }
});

module.exports = router;
