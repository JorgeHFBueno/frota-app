'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container } from 'react-bootstrap';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
    if (res.ok) router.push('/login');
    else {
      const data = await res.json();
      alert(data.error || 'Erro ao cadastrar');
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </Form.Group>
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
        <Button type="submit">Registrar</Button>
      </Form>
    </Container>
  );
}