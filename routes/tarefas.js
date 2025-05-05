const express = require('express');
const router = express.Router();

let tarefas = [];
let proximoId = 1;

// Criar tarefa
router.post('/', (req, res) => {
  const { titulo, concluida = false } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  const novaTarefa = { id: proximoId++, titulo, concluida };
  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

// Listar tarefas com filtro por status (opcional)
router.get('/', (req, res) => {
  const { status } = req.query;

  if (status === 'concluida') {
    const concluidas = tarefas.filter(t => t.concluida === true);
    return res.json(concluidas);
  }

  if (status === 'pendente') {
    const pendentes = tarefas.filter(t => t.concluida === false);
    return res.json(pendentes);
  }

  if (status) {
    return res.status(400).json({ erro: 'Status inválido. Use "concluida" ou "pendente".' });
  }
  return res.json(tarefas);
});

// Atualizar tarefa
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  if (titulo) tarefa.titulo = titulo;
  if (concluida) tarefa.concluida = concluida;

  res.json(tarefa);
});

// Deletar tarefa
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
