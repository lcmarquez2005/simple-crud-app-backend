const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

// Middleware para archivos estáticos
app.use(express.static('public'));
app.use(bodyParser.json());

// Conexión a MongoDB Atlas
const dbURI = "mongodb+srv://Luis:strociak@cluster0.qxj8j.mongodb.net/users";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error de conexión:', err));

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    res.status(200).send('Login exitoso');
  } catch (err) {
    res.status(500).send('Error al autenticar: ' + err.message);
  }
});
// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
      res.status(400).send('Error al registrar el usuario: ' + err.message);
    }
  });

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));
