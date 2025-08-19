import { useEffect, useState } from "react";

interface Escola {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  nome: string;
}

interface Prova {
  id: number;
  nome: string;
}

interface Aluno {
  id: number;
  nome: string;
  nota?: string;
  escola: Escola;
  turma: Turma;
  prova?: Prova;
  data_realizacao?: string;
}

interface AlunoListProps {
  reload?: boolean;
  onReloadDone?: () => void;
  searchNome: string;
  escolaId: number | null;
}

export const AlunoList = ({
  reload,
  onReloadDone,
  searchNome,
  escolaId,
}: AlunoListProps) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchAlunos = async () => {
    try {
      const queryParams = new URLSearchParams({ page: String(page) });

      if (searchNome.trim() !== "") queryParams.append("nome", searchNome);
      if (escolaId !== null) queryParams.append("escola_id", String(escolaId));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/alunos?${queryParams.toString()}`
      );

      const data = await res.json();
      setAlunos(data.data || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error("Erro ao buscar alunos", err);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, [page, searchNome, escolaId]);

  useEffect(() => {
    if (reload) {
      fetchAlunos().then(() => onReloadDone?.());
    }
  }, [reload, onReloadDone]);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b text-sm text-gray-800 font-medium">
        Página <strong>{page}</strong> de <strong>{totalPages}</strong> — Total: {totalItems} alunos
      </div>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-center">Nota</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr
              key={aluno.id}
              className="bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              <td className="px-6 py-3 text-gray-800">{aluno.nome}</td>
              <td className="px-6 py-3 text-center font-semibold text-green-700 text-base">
                {aluno.nota && aluno.nota !== "S/N" ? aluno.nota : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t text-sm text-gray-600">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-40"
        >
          &lt;
        </button>
        <span className="font-medium text-gray-700">{page}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-40"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
