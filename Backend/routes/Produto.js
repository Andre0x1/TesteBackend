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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findById(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Produto" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco, isDisponivel } = req.body;

  try {
    const produto = await Produto.findByIdAndUpdate(
      id,
      { nome, preco, isDisponivel },
      { new: true }
    );

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Produto" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir Produto" });
  }
});

module.exports = router;
