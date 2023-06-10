const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    isDisponivel: { type: Boolean, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Produto", ProdutoSchema);
