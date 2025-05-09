'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Form, Button, Container } from 'react-bootstrap'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      senha,
      redirect: false
    })
    if (res.ok) router.push('/privado/atividades')
    else alert('Credenciais inválidas')
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100 mb-2">
          Entrar
        </Button>
      </Form>

      <div className="text-center">
        <span>Não tem conta? </span>
        <Link href="/registro">
          <Button variant="link">Criar usuário</Button>
        </Link>
      </div>
    </Container>
  )
}
