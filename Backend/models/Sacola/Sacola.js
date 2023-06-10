const mongoose = require("mongoose");

const SacolaSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    tamanho: { type: Number, default: 20 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Sacola", SacolaSchema);
