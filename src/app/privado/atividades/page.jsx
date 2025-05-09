'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Table, Button, Container } from 'react-bootstrap';

export default function AtividadesPage() {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    fetch('${process.env.NEXT_PUBLIC_API_URL}/atividades')
      .then(res => res.json())
      .then(data => setAtividades(data));
  }, []);

  return (
    <Container className="mt-4">
      <h1>Minhas Atividades</h1>
      <Link href="/privado/atividades/create"><Button className="mb-3">Nova Atividade</Button></Link>
      <Table striped>
        <thead>
          <tr><th>Data</th><th>Destino</th><th>KM</th><th>Motivo</th><th>Placa</th><th>Tipo</th><th>Ações</th></tr>
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
              <td>
                <Link href={`/privado/atividades/${a.id}/edit`}><Button size="sm">Editar</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}