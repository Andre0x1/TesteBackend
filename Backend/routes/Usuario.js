const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario/Usuario");
const Sacola = require("../models/Sacola/Sacola");
const Endereco = require("../models/Endereco/Endereco");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { nome, password, dataNascimento, email, endereco } = req.body;
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

    const Usuarioid = newUsuario._id;

    try {
      const newSacola = new Sacola({
        idUsuario: Usuarioid,
      });

      await newSacola.save();
    } catch (error) {
      res.status(206).json({ error: "Erro ao registrar o Sacola do usuario." });
    }
    try {
      if (endereco) {
        const newEndereco = new Endereco({
          idUsuario: Usuarioid,
          rua: endereco.rua,
          cidade: endereco.cidade,
          estado: endereco.estado,
          cep: endereco.cep,
          isPrincipal: true,
        });

        await newEndereco.save();
      }
    } catch (error) {
      res
        .status(206)
        .json({ error: "Erro ao registrar o endereco do usuario." });
    }

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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, password, dataNascimento, email, endereco } = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      {
        nome,
        dataNascimento,
        email,
      },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      usuario.password = hashedPassword;
      await usuario.save();
    }

    if (endereco) {
      const { rua, cidade, estado, cep } = endereco;
      const enderecoAtualizado = await Endereco.findOneAndUpdate(
        { idUsuario: id },
        { rua, cidade, estado, cep },
        { new: true }
      );

      if (!enderecoAtualizado) {
        const novoEndereco = new Endereco({
          idUsuario: id,
          rua,
          cidade,
          estado,
          cep,
          isPrincipal: true,
        });

        await novoEndereco.save();
      }
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await Endereco.deleteMany({ idUsuario: id });

    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

module.exports = router;
