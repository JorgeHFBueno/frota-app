'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

export default function RegistrarPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    data: '',
    destino: '',
    km: '',
    motivo: '',
    placa: '',
    tipo: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      km: parseInt(form.km, 10),
      motorista: session?.user?.email || null
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/atividades`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    if (res.ok) router.push('/privado/atividades/geral');
    else alert('Erro ao registrar');
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h2>Registrar Atividade</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Destino</Form.Label>
          <Form.Control
            name="destino"
            value={form.destino}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quilometragem</Form.Label>
          <Form.Control
            type="number"
            name="km"
            value={form.km}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            name="tipo"
            value={form.tipo}
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
