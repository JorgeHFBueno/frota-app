// src/app/privado/atividades/[id]/edit/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

export default function EditAtividade({ params }) {
  const { id } = params;
  const router = useRouter();

  const [atividade, setAtividade]   = useState(null);
  const [caminhoes, setCaminhoes]   = useState([]);

  /* ───────── carregar atividade e lista de caminhões ───────── */
  useEffect(() => {
    // atividade
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`)
      .then(r => r.json())
      .then(a => {
        // converte data ISO → yyyy-MM-dd para input type=date
        a.data = a.data ? a.data.slice(0, 10) : '';
        setAtividade(a);
      });

    // caminhões
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/caminhoes`)
      .then(r => r.json())
      .then(setCaminhoes);
  }, [id]);

  /* ───────── handlers ───────── */
  function handleChange(e) {
    setAtividade({ ...atividade, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // garante número inteiro para km
    const payload = { ...atividade, km: parseInt(atividade.km, 10) };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    if (res.ok) router.push('/privado/atividades/geral');
    else alert('Erro ao salvar');
  }

  /* ───────── UI ───────── */
  if (!atividade) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h2>Editar Atividade #{id}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            name="data"
            value={atividade.data}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Destino</Form.Label>
          <Form.Control
            name="destino"
            value={atividade.destino || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>KM</Form.Label>
          <Form.Control
            type="number"
            name="km"
            value={atividade.km}
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
            value={atividade.motivo || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Placa</Form.Label>
          <Form.Select
            name="placa"
            value={atividade.placa || ''}
            onChange={handleChange}
            required
          >
            <option value="">— selecione —</option>
            {caminhoes.map(c => (
              <option key={c.placa} value={c.placa}>
                {c.placa}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            name="tipo"
            value={atividade.tipo || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Salvar
        </Button>
      </Form>
    </Container>
  );
}
