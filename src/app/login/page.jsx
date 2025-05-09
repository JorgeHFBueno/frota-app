'use client';

import { useState } from 'react';
import { signIn }   from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      senha,
      redirect: false,
      callbackUrl
    });
    if (res?.ok) router.push(res.url || '/');
    else setError('Credenciais inválidas');
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <Button type="submit" className="w-100">Entrar</Button>
      </Form>
      <p className="mt-3 text-center">
        Não tem conta? <a href="/registro">Criar usuário</a>
      </p>
    </Container>
  );
}
