const mongoose = require("mongoose");

const SacolaProdutosSchema = new mongoose.Schema(
  {
    idSacola: { type: String, required: true },
    idProduto: { type: String, required: true },
    valor: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("SacolaProdutos", SacolaProdutosSchema);
