export const dynamic = 'force-dynamic';

export default async function CaminhoesPage() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/caminhoes`,
    { cache: 'no-store' }
  );
  const caminhoes = await resp.json();

  return (
    <div className="container mt-4">
      <h2>Caminhões</h2>

      <a className="btn btn-primary mb-3" href="/privado/caminhoes/registrar">
        + Novo Caminhão
      </a>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Placa</th><th>Modelo</th><th>Ano</th><th />
          </tr>
        </thead>
        <tbody>
          {caminhoes.map(c => (
            <tr key={c.placa}>
              <td>{c.placa}</td>
              <td>{c.modelo}</td>
              <td>{c.ano}</td>
              <td>
                <a
                  className="btn btn-sm btn-outline-secondary"
                  href={`/privado/caminhoes/${c.placa}/edit`}
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
