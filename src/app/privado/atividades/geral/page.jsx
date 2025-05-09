// src/app/privado/atividades/geral/page.jsx
export const dynamic = 'force-dynamic';           // não gera estático

export default async function GeralPage() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/atividades`,
    { cache: 'no-store' }
  );
  const atividades = await resp.json();

  return (
    <div className="container mt-4">
      <h2>Atividades (Geral)</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Data</th><th>Destino</th>
            <th>Placa</th><th>Tipo</th><th>Motorista</th>
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
              <td>{a.motorista}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
