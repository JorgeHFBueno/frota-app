import { Router } from 'express';
import {
  listAtividades,
  createAtividade,
  getAtividadeById,
  updateAtividade,
  deleteAtividade
} from '../bd/useCases/atividadeUseCases.js';

const r = Router();

r.get('/', async (req, res) => {
  // opcional: filtro por motorista ?motorista=email
  const rows = await listAtividades(req.query.motorista);
  res.json(rows);
});

r.post('/', async (req, res) => {
  const nova = await createAtividade(req.body);
  res.status(201).json(nova);
});

r.route('/:id')
  .get(async (req, res) => res.json(await getAtividadeById(req.params.id)))
  .put(async (req, res) =>
    res.json(await updateAtividade(req.params.id, req.body))
  )
  .delete(async (req, res) => {
    await deleteAtividade(req.params.id);
    res.sendStatus(204);
  });

export default r;
