import express from 'express';
import { validarTitulo } from '../middlewares/validarTitulo.js';
import reqData from '../middlewares/reqData.js';

const router = express.Router();
let tarefas = [];
let proximoId = 1;


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



router.use(reqData);

// Criar tarefa
router.post('/', validarTitulo, (req, res) => {
  const { titulo, concluida = false } = req.body;

  const novaTarefa = { id: proximoId++, titulo, concluida };
  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});


// Listar tarefas
// Com atraso de 4 segundo

router.get('/', async (req, res) => {
  await delay(4000);

  const { status } = req.query;

  if (status === 'concluida') {
    return res.json(tarefas.filter(t => t.concluida));
  }

  if (status === 'pendente') {
    return res.json(tarefas.filter(t => !t.concluida));
  }

  if (status) {
    return res.status(400).json({ erro: 'Status inválido. Use "concluida" ou "pendente".' });
  }

  res.json(tarefas);
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

export default router;
