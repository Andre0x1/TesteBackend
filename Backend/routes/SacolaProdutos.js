const express = require("express");
const router = express.Router();
const SacolaProdutos = require("../models/SacolaProdutos/SacolaProdutos");

router.post("/", async (req, res) => {
  try {
    const { idLista, idProduto, valor } = req.body;
    const count = await SacolaProdutos.countDocuments({ idLista });
    const tamanhoMaximo = 20;

    if (count >= tamanhoMaximo) {
      return res.status(400).json({ error: "A sacola está cheia" });
    }

    const newItem = new SacolaProdutos({ idLista, idProduto, valor });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto à lista" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Listas = await SacolaProdutos.find();
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Listas" });
  }
});

router.get("/produtos/:idLista", async (req, res) => {
  try {
    const { idLista } = req.params.id;
    const Listas = await SacolaProdutos.find({ idLista });
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter produtos da lista" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const lista = await SacolaProdutos.findById(id);

    if (!lista) {
      return res.status(404).json({ error: "Lista não encontrada" });
    }

    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter lista" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idLista, idProduto, valor } = req.body;

  try {
    const lista = await SacolaProdutos.findByIdAndUpdate(
      id,
      { idLista, idProduto, valor },
      { new: true }
    );

    if (!lista) {
      return res.status(404).json({ error: "Lista não encontrada" });
    }

    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar lista" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const lista = await SacolaProdutos.findByIdAndDelete(id);

    if (!lista) {
      return res.status(404).json({ error: "Lista não encontrada" });
    }

    res.json({ message: "Lista excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir lista" });
  }
});

module.exports = router;
