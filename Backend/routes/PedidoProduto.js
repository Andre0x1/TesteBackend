const express = require("express");
const router = express.Router();
const PedidoProduto = require("../models/PedidoProduto/PedidoProduto");

router.post("/pedidproduto", async (req, res) => {
  try {
    const pedidoProduto = await PedidoProduto.create(req.body);
    res.status(201).json(pedidoProduto);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível criar o pedido de produto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pedidosProdutos = await PedidoProduto.find();
    res.json(pedidosProdutos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível obter os pedidos de produtos" });
  }
});

router.get("/pedidoproduto/:id", async (req, res) => {
  const idPedido = req.params.id;
  try {
    const pedidosProdutos = await PedidoProduto.find({ idPedido: idPedido });
    res.json(pedidosProdutos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível obter os pedidos de produtos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pedidoProduto = await PedidoProduto.findById(req.params.id);
    if (pedidoProduto) {
      res.json(pedidoProduto);
    } else {
      res.status(404).json({ error: "Pedido de produto não encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível obter o pedido de produto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pedidoProduto = await PedidoProduto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (pedidoProduto) {
      res.json(pedidoProduto);
    } else {
      res.status(404).json({ error: "Pedido de produto não encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível atualizar o pedido de produto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pedidoProduto = await PedidoProduto.findByIdAndRemove(req.params.id);
    if (pedidoProduto) {
      res.json({ message: "Pedido de produto removido com sucesso" });
    } else {
      res.status(404).json({ error: "Pedido de produto não encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Não foi possível excluir o pedido de produto" });
  }
});

module.exports = router;
