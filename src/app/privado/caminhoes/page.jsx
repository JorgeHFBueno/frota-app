// src/app/privado/caminhoes/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from 'react-bootstrap';

export default function CaminhoesPage() {
  const [caminhoes, setCaminhoes] = useState(null);
  const router = useRouter();

  // carrega lista ao montar o componente
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/caminhoes`)
      .then(r => r.json())
      .then(setCaminhoes);
  }, []);

  // excluir caminhão
  async function handleDelete(placa) {
    if (!confirm('Excluir caminhão?')) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/caminhoes/${placa}`,
      { method: 'DELETE' }
    );
    setCaminhoes(cur => cur.filter(c => c.placa !== placa));
  }

  if (!caminhoes) {
    return (
      <div className="container mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Caminhões</h2>

      <a className="btn btn-primary mb-3" href="/privado/caminhoes/registrar">
        + Novo Caminhão
      </a>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th style={{ width: 160 }} />
          </tr>
        </thead>
        <tbody>
          {caminhoes.map(c => (
            <tr key={c.placa}>
              <td>{c.placa}</td>
              <td>{c.modelo}</td>
              <td>{c.ano}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() =>
                    router.push(`/privado/caminhoes/${c.placa}/edit`)
                  }
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(c.placa)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
