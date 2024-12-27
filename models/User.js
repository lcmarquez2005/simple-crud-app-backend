const mongoose = require('mongoose');

// Esquema de un usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crear un modelo con el esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
