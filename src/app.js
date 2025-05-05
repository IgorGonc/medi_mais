const express = require('express');
const usuariosRouter = require('../routes/usuario');  // note o caminho
const medicamentosRouter = require('../routes/medicamentos');
const app = express();

app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/medicamentos', medicamentosRouter)
app.use('/agendamentos', agendamentosRouter);
app.use('/historico', historicoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
