import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticate from '../authentication/authenticate.js';
import User from '../domain/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: 'Nome de user e senha são obrigatórios' });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'User já existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });

      res.status(201).json({ message: 'User registado com sucesso!', user });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao registar user', error });
  }
});

router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ message: 'User não encontrado' });
      }

      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Senha incorreta' });
      }

      // Gera um token JWT
      const token = jwt.sign({ userId: user._id }, 'secreta', { expiresIn: '1h' });

      res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor' });
  }
});


router.get('/get', authenticate, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId).select('-password'); 
      if (!user) {
          return res.status(404).json({ message: 'User não encontrado' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

export default router;