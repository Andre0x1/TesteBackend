const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const Produto = require("./routes/Produto");
const Usuario = require("./routes/Usuario");
const Sacola = require("./routes/Sacola");
const SacolaProdutos = require("./routes/SacolaProdutos");
const Endereco = require("./routes/Endereco");
const FormaPagamento = require("./routes/FormaPagamento");
const FormaPagamentoUsuario = require("./routes/FormaPagamentoUsuario");
const Pedido = require("./routes/Pedido");

app.use(express.json());
app.use(cors());

app.use("/produto/", Produto);
app.use("/usuario/", Usuario);
app.use("/sacola/", Sacola);
app.use("/produtosSacola/", SacolaProdutos);
app.use("/endereco/", Endereco);
app.use("/formaPagamento/", FormaPagamento);
app.use("/formaPagamentoUsuario/", FormaPagamentoUsuario);
app.use("/pedido/", Pedido);
//app.use("/pedidoProdutos/", PedidoProdutos);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
