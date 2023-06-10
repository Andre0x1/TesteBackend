const express = require("express");
const router = express.Router();
const Endereco = require("../models/Endereco/Endereco");

router.post("/", async (req, res) => {
  try {
    const { idUsuario, rua, cidade, estado, cep } = req.body;
    const newEndereco = new Endereco({ idUsuario, rua, cidade, estado, cep });
    await newEndereco.save();
    res.status(201).json(newEndereco);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar endereço" });
  }
});

router.get("/", async (req, res) => {
  try {
    const enderecos = await Endereco.find();
    res.json(enderecos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter endereços" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const endereco = await Endereco.findById(req.params.id);
    if (!endereco) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }
    res.json(endereco);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter endereço" });
  }
});

router.get("/usuario/:id", async (req, res) => {
  try {
    const { idUsuario } = req.params.id;
    const enderecos = await Endereco.find({ idUsuario });
    if (!endereco) {
      return res.status(404).json({ error: "Endereços não encontrados" });
    }
    res.json(enderecos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter endereço" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { idUsuario, rua, cidade, estado, cep } = req.body;
    const updatedEndereco = await Endereco.findByIdAndUpdate(
      req.params.id,
      { idUsuario, rua, cidade, estado, cep },
      { new: true }
    );
    if (!updatedEndereco) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }
    res.json(updatedEndereco);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar endereço" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEndereco = await Endereco.findByIdAndRemove(req.params.id);
    if (!deletedEndereco) {
      return res.status(404).json({ error: "Endereço não encontrado" });
    }
    res.json({ message: "Endereço removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover endereço" });
  }
});

module.exports = router;
