const express = require("express");
const router = express.Router();
const Pedido = require("../models/Pedido/Pedido");

router.post("/", async (req, res) => {
  try {
    const { idUsuario, valorTotal, idFormaPagamentoUsuario, idEndereco } =
      req.body;
    const novoPedido = new Pedido({
      idUsuario,
      valorTotal,
      idFormaPagamentoUsuario,
      idEndereco,
    });
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar pedido" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedidos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedido" });
  }
});

router.get("/usuario/:idUsuario", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const pedidos = await Pedido.find({ idUsuario: idUsuario });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter pedidos do usuário" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndRemove(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json({ message: "Pedido excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir pedido" });
  }
});

module.exports = router;
