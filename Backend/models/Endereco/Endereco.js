const mongoose = require("mongoose");

const EnderecoSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    rua: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
    isPrincipal: { type: Boolean, default: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Endereco", EnderecoSchema);
