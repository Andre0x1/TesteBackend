const mongoose = require("mongoose");

const FormaPagamentoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    tipo: {
      type: String,
      enum: ["Dinheiro", "Vale Alimentação", "Cartão Credito", "Cartão Debito"],
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("FormaPagamento", FormaPagamentoSchema);
