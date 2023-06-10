const mongoose = require("mongoose");

const PedidoProdutoSchema = new mongoose.Schema(
  {
    idPedido: { type: String, required: true },
    idProduto: { type: String, required: true },
    valor: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("PedidoProduto", PedidoProdutoSchema);
