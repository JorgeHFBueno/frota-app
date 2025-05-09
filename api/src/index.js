// api/src/index.js
import express from 'express';
import cors from 'cors';
import { pool } from './bd/config.js';
import atividadesRoutes from './routes/atividades.js';
import caminhoesRoutes from './routes/caminhoes.js';

const app = express();
app.use(cors());          // libera chamadas do domínio front
app.use(express.json());
app.use('/atividades', atividadesRoutes);
app.use('/caminhoes', caminhoesRoutes);

// rota de teste
app.get('/health', async (_, res) => {
  const now = await pool.query('SELECT NOW()');
  res.json({ ok: true, db_time: now.rows[0].now });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('API running on', PORT));
