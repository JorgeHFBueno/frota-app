import { NextResponse }     from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions }      from '@/auth/auth'
import {
  getAtividadeById,
  updateAtividade,
  deleteAtividade,
} from '@/bd/useCases/atividadeUseCases'

// -------- GET (opcional) ----------
export async function GET(_, { params }) {
  const atividade = await getAtividadeById(params.id)
  return NextResponse.json(atividade ?? {}, { status: atividade ? 200 : 404 })
}

// -------- PUT  --------------------
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const updated = await updateAtividade(params.id, body)
  return NextResponse.json(updated, { status: 200 })
}

// -------- DELETE ------------------
export async function DELETE(_, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await deleteAtividade(params.id)
  return NextResponse.json({ ok: true }, { status: 204 })
}
