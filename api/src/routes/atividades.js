import { Router } from 'express';
import {
  listAtividades,
  createAtividade,
  getAtividadeById,
  updateAtividade,
  deleteAtividade
} from '../bd/useCases/atividadeUseCases.js';

const r = Router();

r.get('/', async (_, res) => res.json(await listAtividades()));

r.post('/', async (req, res) => {
  const nova = await createAtividade(req.body);
  return res.status(201).json(nova);
});

// -------- rota por ID --------
r.route('/:id')
  .get(async (req, res) => {
    const atv = await getAtividadeById(req.params.id);
    atv ? res.json(atv) : res.sendStatus(404);
  })
  .put(async (req, res) => {
    const upd = await updateAtividade(req.params.id, req.body);
    upd ? res.json(upd) : res.sendStatus(404);
  })
  .delete(async (req, res) => {
    await deleteAtividade(req.params.id);
    res.sendStatus(204);
  });

export default r;
