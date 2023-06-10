const express = require("express");
const router = express.Router();
const FormaPagamento = require("../models/FormaPagamento/FormaPagamento");

router.post("/", async (req, res) => {
  try {
    const { nome, tipo } = req.body;
    const novaFormaPagamento = new FormaPagamento({
      idUsuario,
      nome,
      descricao,
      tipo,
    });
    await novaFormaPagamento.save();
    res.status(201).json(novaFormaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar forma de pagamento" });
  }
});

router.get("/", async (req, res) => {
  try {
    const formasPagamento = await FormaPagamento.find();
    res.json(formasPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter formas de pagamento" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const formaPagamento = await FormaPagamento.findById(req.params.id);
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json(formaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter forma de pagamento" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nome, tipo } = req.body;
    const formaPagamento = await FormaPagamento.findByIdAndUpdate(
      req.params.id,
      { idUsuario, nome, descricao, tipo },
      { new: true }
    );
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json(formaPagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar forma de pagamento" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const formaPagamento = await FormaPagamento.findByIdAndRemove(
      req.params.id
    );
    if (!formaPagamento) {
      return res
        .status(404)
        .json({ error: "Forma de pagamento não encontrada" });
    }
    res.json({ message: "Forma de pagamento excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir forma de pagamento" });
  }
});

module.exports = router;
