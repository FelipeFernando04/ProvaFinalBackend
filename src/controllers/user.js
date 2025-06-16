const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    user.password_hash = undefined;

    res.status(201).json(user);
  } catch (err) {
    // Tratamento de erro para e-mail duplicado
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, 'seu-segredo-jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function index(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'admin', 'createdAt', 'updatedAt'],
    });

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

// Exporta todas as funções em um único objeto
module.exports = {
  register,
  login,
  index,
};