const express = require('express');
const app = express();
const PORT = 3000;

const tarefasRouter = require('./routes/tarefas');

app.use((req, res, next) => {
  const agora = new Date().toLocaleString();
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use('/tarefas', tarefasRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
