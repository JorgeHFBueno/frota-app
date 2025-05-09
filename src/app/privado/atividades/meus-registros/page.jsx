'use client'

import { useEffect, useState } from 'react'
import { useSession }          from 'next-auth/react'
import { useRouter }           from 'next/navigation'
import Link                    from 'next/link'
import { Table, Button, Container } from 'react-bootstrap'

export default function MeusRegistrosPage() {
  const { data: session } = useSession({ required: true })
  const router = useRouter()
  const [atividades, setAtividades] = useState([])

  // carrega registros do usuário
  async function load() {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/atividades')   // já devolve apenas do user logado
    const data = await res.json()
    setAtividades(data)
  }
  useEffect(() => { load() }, [])

  // DELETE
  async function handleDelete(id) {
    if (!confirm('Excluir registro?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`, { method: 'DELETE' })
    load()                 // recarrega lista
  }

  return (
    <Container className="mt-4">
      <h1>Meus Registros</h1>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Data</th><th>Destino</th><th>KM</th><th>Motivo</th>
            <th>Placa</th><th>Tipo</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map(a => (
            <tr key={a.id}>
              <td>{new Date(a.data).toLocaleDateString()}</td>
              <td>{a.destino}</td>
              <td>{a.km}</td>
              <td>{a.motivo}</td>
              <td>{a.placa}</td>
              <td>{a.tipo}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <Link
                  href={`/privado/atividades/${a.id}/edit`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Editar
                </Link>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(a.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
