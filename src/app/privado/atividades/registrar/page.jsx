'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Button, Container } from 'react-bootstrap'

export default function RegistrarPage() {
  const [form, setForm] = useState({
    data: '',
    destino: '',
    km: '',
    motivo: '',
    placa: '',
    tipo: ''
  })
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/atividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        km: parseInt(form.km, 10),
        motorista: sessionStorage.getItem('userEmail') // ou adapte para seu campo de sessão
      })
    })
    if (res.ok) {
      router.push('/privado/atividades/meus-registros')
    } else {
      alert('Erro ao cadastrar atividade')
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Registrar Atividade</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            value={form.data}
            onChange={e => setForm({ ...form, data: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Destino</Form.Label>
          <Form.Control
            type="text"
            value={form.destino}
            onChange={e => setForm({ ...form, destino: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>KM</Form.Label>
          <Form.Control
            type="number"
            value={form.km}
            onChange={e => setForm({ ...form, km: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={form.motivo}
            onChange={e => setForm({ ...form, motivo: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Placa</Form.Label>
          <Form.Control
            type="text"
            value={form.placa}
            onChange={e => setForm({ ...form, placa: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            value={form.tipo}
            onChange={e => setForm({ ...form, tipo: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit">Registrar</Button>
      </Form>
    </Container>
  )
}
