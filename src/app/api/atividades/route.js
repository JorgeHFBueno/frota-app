import { NextResponse }        from 'next/server'
import { getServerSession }    from 'next-auth/next'
import { authOptions }         from '@/auth/auth'
import { pool }                from '@/bd/config'

// --------- POST  (inserir nova atividade) ----------
export async function POST(request) {
  try {
    // sessão -> obter id do usuário logado
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      data,
      destino,
      km,
      motivo,
      placa,
      tipo
    } = body

    // simple validation
    if (!data || !destino || !km || !motivo || !placa || !tipo) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    // INSERT no banco, ligando FK motorista = session.user.id
    const res = await pool.query(
      `INSERT INTO atividades
       (data, destino, km, motivo, placa, tipo, motorista)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [data, destino, km, motivo, placa, tipo, session.user.id]
    )

    return NextResponse.json(res.rows[0], { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

// --------- GET  (listar TODAS as atividades) ----------
export async function GET() {
  const res = await pool.query(
    `SELECT a.*, u.nome AS motorista_nome
      FROM atividades a
      JOIN usuarios u ON u.email = a.motorista
     ORDER BY a.data DESC`
    );
  return NextResponse.json(res.rows, { status: 200 })
}
