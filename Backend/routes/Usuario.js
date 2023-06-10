const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario/Usuario");
const Sacola = require("../models/Sacola/Sacola");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { nome, password, dataNascimento, email } = req.body;

  try {
    const existingUsuario = await Usuario.findOne({ email });

    if (existingUsuario) {
      return res.status(409).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({
      nome,
      dataNascimento,
      email,
      password: hashedPassword,
    });
    await newUsuario.save();

    const userId = newUsuario._id;

    const SacolaUser = new Sacola({
      userId,
    });

    await SacolaUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o usuário" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Usuarios = await Usuario.find();
    res.json(Usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Usuarios" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar a autenticação" });
  }
});

module.exports = router;
