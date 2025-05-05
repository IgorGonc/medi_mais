const express = require('express');
const pool = require('../src/db');
const medicamentosRouter = express.Router(); 

medicamentosRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medicamentos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medicamentosRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medicamentosRouter.post('/', async (req, res) => {
  try {
    const { usuario_id, nome, dosagem, frequencia } = req.body;
    const result = await pool.query(
      `INSERT INTO medicamentos (usuario_id, nome, dosagem, frequencia)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [usuario_id, nome, dosagem, frequencia]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medicamentosRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, dosagem, frequencia } = req.body;
    const result = await pool.query(
      `UPDATE medicamentos SET nome=$1, dosagem=$2, frequencia=$3 WHERE id=$4 RETURNING *`,
      [nome, dosagem, frequencia, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medicamentosRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM medicamentos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = medicamentosRouter