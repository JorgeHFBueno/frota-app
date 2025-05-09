'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button } from 'react-bootstrap';

export default function RegistrarCaminhao() {
  const router = useRouter();
  const [form, setForm] = useState({ placa: '', modelo: '', ano: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/caminhoes`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ano: parseInt(form.ano, 10) })
      }
    );
    if (res.ok) router.push('/privado/caminhoes');
    else alert('Erro ao cadastrar caminhão');
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 500 }}>
      <h2>Novo Caminhão</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Placa</Form.Label>
          <Form.Control
            name="placa"
            value={form.placa}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="number"
            name="ano"
            value={form.ano}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          Salvar
        </Button>
      </Form>
    </Container>
  );
}
