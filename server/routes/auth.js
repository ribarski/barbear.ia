const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Barber = require('../models/Barber');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Registro Barbeiro
router.post('/register-barber', async (req, res) => {
  const { name, cpf, email, phone, password, barbershop } = req.body;
  try {
    if (!name || !cpf || !email || !phone || !password || !barbershop) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    const barberExists = await Barber.findOne({ email });
    if (barberExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const barber = await Barber.create({ name, cpf, email, phone, password, barbershop });
    return res.status(201).json({ message: 'Barbeiro registrado com sucesso!' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
});

module.exports = router;
