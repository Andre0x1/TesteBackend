const mongoose = require("mongoose");

const SacolaSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Sacola", SacolaSchema);
