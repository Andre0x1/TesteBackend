const express = require("express");
const router = express.Router();
const ListaProdutos = require("../models/Sacola_Produto/Sacola_Produtos");

router.post("/", async (req, res) => {
  try {
    const { idLista, idProduto } = req.body;
    const newItem = new ListaProdutos({ idLista, idProduto });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto a Lista" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Listas = await ListaProdutos.find();
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Listas" });
  }
});

router.get("/produtos/:idLista", async (req, res) => {
  try {
    const { idLista } = req.params.id;
    const Listas = await ListaProdutos.find({ idLista });
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter produtos da lista" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const lista = await ListaProdutos.findById(id);

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
  const { idLista, idProduto } = req.body;

  try {
    const lista = await ListaProdutos.findByIdAndUpdate(
      id,
      { idLista, idProduto },
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
    const lista = await ListaProdutos.findByIdAndDelete(id);

    if (!lista) {
      return res.status(404).json({ error: "Lista não encontrada" });
    }

    res.json({ message: "Lista excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir lista" });
  }
});

module.exports = router;
