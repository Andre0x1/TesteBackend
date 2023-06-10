const mongoose = require("mongoose");

const FormaPagamentoUsuarioSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    idFormaPagamento: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "FormaPagamentoUsuario",
  FormaPagamentoUsuarioSchema
);
