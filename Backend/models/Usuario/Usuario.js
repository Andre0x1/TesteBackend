const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

UsuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
