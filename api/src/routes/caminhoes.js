import { Router } from 'express';
import {
  listCaminhoes,
  getCaminhao,
  createCaminhao,
  updateCaminhao,
  deleteCaminhao
} from '../bd/useCases/caminhaoUseCases.js';

const r = Router();

r.get('/', async (_, res) => res.json(await listCaminhoes()));

r.post('/', async (req, res) => {
  const novo = await createCaminhao(req.body);
  res.status(201).json(novo);
});

r.route('/:placa')
  .get(async (req, res) => res.json(await getCaminhao(req.params.placa)))
  .put(async (req, res) =>
    res.json(await updateCaminhao(req.params.placa, req.body))
  )
  .delete(async (req, res) => {
    await deleteCaminhao(req.params.placa);
    res.sendStatus(204);
  });

export default r;
