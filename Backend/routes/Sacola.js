const express = require("express");
const router = express.Router();
const Sacola = require("../models/Sacola/Sacola");
const SacolaProduto = require("../models/Sacola_Produto/Sacola_Produtos");
const Pedido = require("../models/Pedido/Pedido");
const PedidoProduto = require("../models/Pedido_Produto/Pedido_Produtos");

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

router.post("/:idSacola/pedido", async (req, res) => {
  try {
    const idSacola = req.params.idSacola;
    const formaPagamento = req.body;
    const sacola = await Sacola.findById(idSacola);
    if (!sacola) {
      return res.status(404).json({ error: "Sacola não encontrada" });
    }

    const sacolaProdutos = await SacolaProduto.find({ idSacola });
    if (sacolaProdutos.length === 0) {
      return res.status(400).json({ error: "A sacola está vazia" });
    }

    const pedido = new Pedido({
      idUsuario: sacola.idUsuario,
      valorTotal: 0,
      formaPagamento: formaPagamento,
    });
    await pedido.save();

    let valorTotal = 0;

    for (const sacolaProduto of sacolaProdutos) {
      const pedidoProduto = new PedidoProduto({
        idPedido: pedido._id,
        idProduto: sacolaProduto.idProduto,
        valor: sacolaProduto.valor,
      });
      await pedidoProduto.save();
      valorTotal += pedidoProduto.valor;
    }

    pedido.valorTotal = valorTotal;
    await pedido.save();

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido" });
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
