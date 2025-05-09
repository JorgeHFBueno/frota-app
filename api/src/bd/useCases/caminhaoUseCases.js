import { pool } from '../config.js';

export async function listCaminhoes() {
  const { rows } = await pool.query('SELECT * FROM caminhoes ORDER BY placa');
  return rows;
}

export async function getCaminhao(placa) {
  const { rows } = await pool.query(
    'SELECT * FROM caminhoes WHERE placa = $1',
    [placa]
  );
  return rows[0];
}

export async function createCaminhao(data) {
  const { placa, modelo, ano } = data;
  const { rows } = await pool.query(
    'INSERT INTO caminhoes (placa, modelo, ano) VALUES ($1,$2,$3) RETURNING *',
    [placa, modelo, ano]
  );
  return rows[0];
}

export async function updateCaminhao(placa, data) {
  const { modelo, ano } = data;
  const { rows } = await pool.query(
    'UPDATE caminhoes SET modelo=$1, ano=$2 WHERE placa=$3 RETURNING *',
    [modelo, ano, placa]
  );
  return rows[0];
}

export async function deleteCaminhao(placa) {
  await pool.query('DELETE FROM caminhoes WHERE placa=$1', [placa]);
}
