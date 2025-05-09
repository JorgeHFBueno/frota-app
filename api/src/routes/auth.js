import { Router } from 'express';
import { pool }   from '../bd/config.js';

const r = Router();

// ------- LOGIN -------
r.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const { rows } = await pool.query(
    'SELECT id, nome, email FROM usuarios WHERE email=$1 AND senha=$2',
    [email, senha]
  );
  if (rows.length === 0) return res.status(401).json({ error: 'Invalid' });
  res.json(rows[0]);         // { id, nome, email }
});

// ------- REGISTER -------
r.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1,$2,$3) RETURNING id,nome,email',
      [nome, email, senha]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {      // duplicate key
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    res.status(500).json({ error: 'server' });
  }
});

export default r;
