import { pool } from '../../../../src/bd/config';

export async function listAtividades(motoristaId) {
  const res = await pool.query(
    'SELECT * FROM atividades WHERE motorista=$1 ORDER BY data DESC',[motoristaId]
  );
  return res.rows;
}

export async function getAtividadeById(id) {
  const res = await pool.query('SELECT * FROM atividades WHERE id=$1', [id]);
  return res.rows[0];
}

export async function createAtividade(data) {
  const props = ['data','destino','km','motivo','motorista','placa','tipo'];
  const vals = props.map((_,i) => '$'+(i+1));
  const params = props.map(p => data[p]);
  const res = await pool.query(
    `INSERT INTO atividades (${props.join(',')}) VALUES (${vals.join(',')}) RETURNING *`,
    params
  );
  return res.rows[0];
}

export async function updateAtividade(id, data) {
  const sets = Object.keys(data).map((k,i)=>`${k}=$${i+1}`);
  const params = Object.values(data);
  params.push(id);
  const res = await pool.query(
    `UPDATE atividades SET ${sets.join(',')} WHERE id=$${params.length} RETURNING *`,
    params
  );
  return res.rows[0];
}

export async function deleteAtividade(id) {
  await pool.query('DELETE FROM atividades WHERE id=$1', [id]);
}