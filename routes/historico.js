const express = require('express');
const pool = require('../src/db');
const historicoRouter = express.Router();

historicoRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM historico_consumo');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

historicoRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM historico_consumo WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

historicoRouter.post('/', async (req, res) => {
  try {
    const { agendamento_id, status, observacoes } = req.body;
    const result = await pool.query(
      `INSERT INTO historico_consumo (agendamento_id, status, observacoes)
       VALUES ($1,$2,$3) RETURNING *`,
      [agendamento_id, status, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

historicoRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, observacoes } = req.body;
    const result = await pool.query(
      `UPDATE historico_consumo SET status=$1, observacoes=$2 WHERE id=$3 RETURNING *`,
      [status, observacoes, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

historicoRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM historico_consumo WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = historicoRouter
