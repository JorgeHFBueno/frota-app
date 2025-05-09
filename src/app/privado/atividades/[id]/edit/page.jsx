'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Form, Button, Container, Spinner } from 'react-bootstrap'

export default function EditAtividadePage() {
  const router = useRouter()
  const { id } = useParams()          // id vindo da URL

  const [form, setForm] = useState({
    data: '',
    destino: '',
    km: '',
    motivo: '',
    placa: '',
    tipo: ''
  })
  const [loading, setLoading] = useState(true)

  // carregamento inicial
  useEffect(() => {
    async function fetchAtividade() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`)
      if (!res.ok) {
        alert('Registro não encontrado')
        return router.push('/privado/meus-registros')
      }
      const data = await res.json()
      setForm({
        data: data.data?.slice(0, 10) ?? '',
        destino: data.destino ?? '',
        km: data.km ?? '',
        motivo: data.motivo ?? '',
        placa: data.placa ?? '',
        tipo: data.tipo ?? ''
      })
      setLoading(false)
    }
    fetchAtividade()
  }, [id, router])

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch(`/api/atividades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, km: parseInt(form.km, 10) })
    })
    if (res.ok) {
      router.push('/privado/atividades/meus-registros')
    } else {
      alert('Erro ao salvar')
    }
  }

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Editar Atividade #{id}</h2>
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

        <Button type="submit" className="me-2">
          Salvar
        </Button>
        <Button variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </Form>
    </Container>
  )
}
