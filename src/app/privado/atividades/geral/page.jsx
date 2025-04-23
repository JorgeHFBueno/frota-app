import { pool }     from "@/bd/config"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions }     from "@/auth/auth"

export default async function GeralPage() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect('/login')

  const res = await pool.query(
    'SELECT a.*, u.nome AS motorista_nome FROM atividades a JOIN usuarios u ON u.email = a.motorista ORDER BY a.data DESC'
  )
  const atividades = res.rows

  return (
    <div className="container mt-4">
      <h1>Todos os Registros</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Data</th>
            <th>Destino</th>
            <th>KM</th>
            <th>Motivo</th>
            <th>Placa</th>
            <th>Tipo</th>
            <th>Motorista</th>
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
              <td>{a.motorista_nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
