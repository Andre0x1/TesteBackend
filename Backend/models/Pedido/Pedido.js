const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    valorTotal: { type: Number },
    formaPagamento: { type: String, required: true },
    dataPedido: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Pedido", PedidoSchema);
