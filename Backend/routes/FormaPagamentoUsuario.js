const express = require("express");
const router = express.Router();
const FormaPagamentoUsuario = require("../models/FormaPagamentoUsuario/FormaPagamentoUsuario");
const FormaPagamento = require("../models/FormaPagamento/FormaPagamento");

router.post("/", async (req, res) => {
  try {
    const { idUsuario, idFormaPagamento } = req.body;
    const formaPagamentoUsuario = new FormaPagamentoUsuario({
      idUsuario: idUsuario,
      idFormaPagamento: idFormaPagamento,
    });
    await formaPagamentoUsuario.save();
    res.status(201).json(formaPagamentoUsuario);
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
});

router.get("/", async (req, res) => {
  try {
    const formaPagamentoUsuario = await FormaPagamentoUsuario.find();
    res.json(formaPagamentoUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao obter Forma de pagamento", msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const formaPagamento = await FormaPagamentoUsuario.findById(req.params.id);
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json(formaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Forma de pagamento" });
  }
});

router.get("usuario/:id", async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const formaPagamento = await FormaPagamentoUsuario.find({
      idUsuario: idUsuario,
    });
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json(formaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Forma de pagamento" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { idFormaPagamento, idPrincipal } = req.body;
    const formaPagamento = await FormaPagamentoUsuario.findByIdAndUpdate(
      req.params.id,
      { idFormaPagamento, idPrincipal },
      { new: true }
    );
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json(formaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Forma de pagamento" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const formaPagamento = await FormaPagamentoUsuario.findByIdAndRemove(
      req.params.id
    );
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json({ message: "Forma de pagamento excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir Forma de pagamento" });
  }
});

module.exports = router;
