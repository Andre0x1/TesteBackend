const mongoose = require("mongoose");

const FormaPagamentoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    tipo: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("FormaPagamento", FormaPagamentoSchema);
