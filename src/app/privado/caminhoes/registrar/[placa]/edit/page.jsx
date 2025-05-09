'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

export default function EditCaminhao({ params }) {
  const { placa } = params;
  const router = useRouter();
  const [form, setForm] = useState(null);

  // carrega dados
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/caminhoes/${placa}`)
      .then(r => r.json())
      .then(setForm);
  }, [placa]);

  if (!form) return <Spinner className="m-3" />;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/caminhoes/${placa}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelo: form.modelo, ano: parseInt(form.ano, 10) })
      }
    );
    if (res.ok) router.push('/privado/caminhoes');
    else alert('Erro ao salvar');
  }

  async function handleDelete() {
    if (!confirm('Excluir caminhão?')) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/caminhoes/${placa}`,
      { method: 'DELETE' }
    );
    router.push('/privado/caminhoes');
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 500 }}>
      <h2>Editar Caminhão</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Placa</Form.Label>
          <Form.Control value={placa} disabled />
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

        <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Container>
  );
}
