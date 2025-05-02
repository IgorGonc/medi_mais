const express = require('express');
const usuariosRouter = require('../routes/usuario');  // note o caminho
const app = express();

app.use(express.json());

// monta todas as rotas de /usuarios
app.use('/usuarios', usuariosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
