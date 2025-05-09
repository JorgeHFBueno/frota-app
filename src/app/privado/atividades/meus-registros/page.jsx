'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Table, Spinner } from 'react-bootstrap';

export default function MeusRegistrosPage() {
  const { data: session } = useSession();
  const [atividades, setAtividades] = useState(null);

  // carrega lista
  useEffect(() => {
    const email = session?.user?.email;
    const url = email
      ? `${process.env.NEXT_PUBLIC_API_URL}/atividades?motorista=${email}`
      : `${process.env.NEXT_PUBLIC_API_URL}/atividades`;

    fetch(url)
      .then(r => r.json())
      .then(setAtividades);
  }, [session]);

  async function handleDelete(id) {
    if (!confirm('Excluir atividade?')) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`,
      { method: 'DELETE' }
    );
    setAtividades(cur => cur.filter(a => a.id !== id));
  }

  if (!atividades) return <Spinner animation="border" className="m-3" />;

  return (
    <div className="container mt-4">
      <h2>Minhas Atividades</h2>

      <Table striped>
        <thead>
          <tr>
            <th>ID</th><th>Data</th><th>Destino</th>
            <th>Placa</th><th>Tipo</th><th />
          </tr>
        </thead>
        <tbody>
          {atividades.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{new Date(a.data).toLocaleDateString()}</td>
              <td>{a.destino}</td>
              <td>{a.placa}</td>
              <td>{a.tipo}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(a.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
