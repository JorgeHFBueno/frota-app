import { pool } from '../config'
import Usuario from '../entities/Usuario'

/**
 * Tenta buscar um usuário pelo par email+senha.
 * @param {{ email: string, senha: string }} objeto
 * @returns {Promise<Usuario|null>}
 */
export async function autenticaUsuarioDB({ email, senha }) {
  try {
    const results = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    )
    if (results.rowCount === 0) return null

    const u = results.rows[0]
    return new Usuario(u.email, u.tipo, u.telefone, u.nome)
  } catch (err) {
    throw new Error('Erro ao autenticar o usuário: ' + err.message)
  }
}

/**
 * Insere um novo usuário.
 * @param {{ nome: string, email: string, senha: string }} data
 * @returns {Promise<{ id: number, nome: string, email: string }>}
 */
export async function createUser({ nome, email, senha }) {
  const res = await pool.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
    [nome, email, senha]
  )
  return res.rows[0]
}
