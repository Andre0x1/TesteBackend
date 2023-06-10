const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const Produto = require("./routes/Produto");
const Usuario = require("./routes/Usuario");
const Sacola = require("./routes/Sacola");
const SacolaProdutos = require("./routes/SacolaProdutos");

app.use(express.json());
app.use(cors());

app.use("/produto/", Produto);
app.use("/usuario/", Usuario);
app.use("/sacola/", Sacola);
app.use("/produtos_sacola/", SacolaProdutos);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
