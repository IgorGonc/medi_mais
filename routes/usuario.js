const express = require('express');
const pool = require('../src/db'); 

const usuariosRouter = express.Router();

// Listar todos
usuariosRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar por ID
usuariosRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar
usuariosRouter.post('/', async (req, res) => {
  try {
    const { nome, email, senha_hash } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar
usuariosRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha_hash } = req.body;
    const result = await pool.query(
      `UPDATE usuarios SET nome=$1, email=$2, senha_hash=$3 WHERE id=$4 RETURNING *`,
      [nome, email, senha_hash, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar
usuariosRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = usuariosRouter