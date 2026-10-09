// Rodapé compartilhado por todas as páginas.
// Substitui o footer duplicado em index.html, cadastro.html, produtor.html,
// ong.html e contato.html.
export default function Footer() {
  return (
    <footer className="ah-footer py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
        <p>AgroHub - Engenharia de Software FIAP 2026.</p>
        <p>Grupo 86 - ODS 2.</p>
      </div>
    </footer>
  );
}
