// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server'
import { createUser } from '@/bd/useCases/usuarioUseCases'

export async function POST(request) {
  try {
    const { nome, email, senha } = await request.json()
    await createUser({ nome, email, senha })
    return NextResponse.json({ message: 'Usuário criado' }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err.code === '23505' ? 'Email já cadastrado' : err.message },
      { status: 400 }
    )
  }
}
