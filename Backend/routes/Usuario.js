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

    try {
      const newSacola = new Sacola({
        idUsuario: newUsuario._id,
      });

      await newSacola.save();
    } catch (error) {
      res.status(206).json({ error: "Erro ao registrar o Sacola do usuario." });
    }
    try {
      if (endereco) {
        const newEndereco = new Endereco({
          idUsuario: newUsuario._id,
          rua: endereco.rua,
          cidade: endereco.cidade,
          estado: endereco.estado,
          cep: endereco.cep,
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

module.exports = router;
