const mongoose = require("mongoose");

const FormaPagamentoUsuarioSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    idFormaPagamento: { type: String, required: true },
    idPrincipal: { type: String, default: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "FormaPagamentoUsuario",
  FormaPagamentoUsuarioSchema
);
