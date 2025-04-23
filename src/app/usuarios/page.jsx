'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function UsuarioPage() {
  const { data: session } = useSession({ required: true });
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  useEffect(() => {
    // buscar dados do usuário logado
    fetch('/api/usuarios/me')
      .then(res => res.json())
      .then(data => setForm({ nome: data.nome, email: data.email, senha: '' }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/usuarios/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Dados atualizados');
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h2>Meu Perfil</h2>
      <Form onSubmit={handleSubmit}>
        {/* campos nome, email, senha */}
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            required
          />
        </Form.Group>
        {/* ... */}
        <Button type="submit">Atualizar</Button>
      </Form>
    </Container>
  );
}