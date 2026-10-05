import { useEffect, useMemo, useState } from "react";
import { useNotifications } from "../context/NotificationsContext.jsx";

const FAVORITES_STORAGE_KEY = "agrohub-ong-favorites";

const initialItems = [
  {
    id: 1,
    category: "graos",
    distance: 32,
    title: "Milho verde - 200 kg",
    meta: "Fazenda São João - Sorocaba, SP - até 25/06",
    badge: "Disponível",
    priority: "success",
    scheduled: false,
    icon: "M",
  },
  {
    id: 2,
    category: "hortifruti",
    distance: 47,
    title: "Tomate - 80 kg",
    meta: "Sítio Boa Vista - Itu, SP - até 22/06",
    badge: "Urgente",
    priority: "warning",
    scheduled: false,
    icon: "T",
  },
  {
    id: 3,
    category: "hortifruti",
    distance: 51,
    title: "Cenoura - 150 kg",
    meta: "Chácara Esperança - Votorantim, SP - até 28/06",
    badge: "Disponível",
    priority: "success",
    scheduled: false,
    icon: "C",
  },
  {
    id: 4,
    category: "laticinios",
    distance: 92,
    title: "Leite UHT - 50 caixas",
    meta: "Cooperativa Laticínio SP - Araçariguama, SP - até 27/06",
    badge: "Disponível",
    priority: "success",
    scheduled: false,
    icon: "L",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "graos", label: "Grãos" },
  { id: "hortifruti", label: "Hortifruti" },
  { id: "laticinios", label: "Laticínios" },
];

export default function Ong() {
  const { excedentes } = useNotifications();
  const [activeFilter, setActiveFilter] = useState("todos");
  const [maxDistance, setMaxDistance] = useState(80);
  const [scheduledIds, setScheduledIds] = useState(() => new Set());
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [showingFavorites, setShowingFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const items = useMemo(() => {
    const merged = [...excedentes, ...initialItems];
    return merged.map((item) =>
      scheduledIds.has(item.id)
        ? { ...item, scheduled: true, badge: "Agendado", priority: "muted" }
        : item
    );
  }, [excedentes, scheduledIds]);

  const visibleItems = useMemo(() => {
    const sourceItems = showingFavorites
      ? favorites.map((item) =>
          scheduledIds.has(item.id)
            ? { ...item, scheduled: true, badge: "Agendado", priority: "muted" }
            : item
        )
      : items;

    return sourceItems.filter(
        (item) =>
          (activeFilter === "todos" || item.category === activeFilter) &&
          item.distance <= maxDistance
      );
  }, [activeFilter, favorites, items, maxDistance, scheduledIds, showingFavorites]);

  const handleSchedule = (id) => {
    setScheduledIds((current) => new Set(current).add(id));
  };

  const toggleFavorite = (item) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === item.id)
        ? current.filter((favorite) => favorite.id !== item.id)
        : [item, ...current]
    );
  };

  return (
    <>
      <section className="ah-page-hero">
        <div className="container">
          <span className="ah-eyebrow">ONG parceira</span>
          <h1 className="ah-title mb-3">Previsibilidade para planejar coletas.</h1>
          <p className="ah-lead mb-0">
            O painel mostra o que está disponível, onde está e quando pode ser
            retirado.
          </p>
        </div>
      </section>

      <section className="ah-section">
        <div className="container">
          <div className="row g-3 mb-4">
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">12</strong>
                <span className="ah-stat-label">excedentes</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">4</strong>
                <span className="ah-stat-label">coletas</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">238</strong>
                <span className="ah-stat-label">famílias</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">1,4 t</strong>
                <span className="ah-stat-label">redistribuídas</span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                <div>
                  <span className="ah-eyebrow">Excedentes</span>
                  <h2 className="ah-section-title mb-0">Disponíveis na região</h2>
                </div>
                <div
                  className="d-flex flex-wrap gap-2 align-self-md-end"
                  data-filter-group
                  aria-label="Filtrar excedentes por categoria"
                >
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      className={`ah-tab${activeFilter === filter.id ? " active" : ""}`}
                      type="button"
                      data-filter={filter.id}
                      aria-pressed={activeFilter === filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                  <button
                    className={`ah-tab${showingFavorites ? " active" : ""}`}
                    type="button"
                    aria-pressed={showingFavorites}
                    onClick={() => setShowingFavorites((current) => !current)}
                  >
                    Salvos ({favorites.length})
                  </button>
                </div>
              </div>

              <div className="ah-list" data-donation-list>
                {visibleItems.map((item) => {
                  const isFavorite = favorites.some(
                    (favorite) => favorite.id === item.id
                  );
                  const badgeClass =
                    item.scheduled
                      ? "ah-badge ah-badge-muted"
                      : item.priority === "warning"
                        ? "ah-badge ah-badge-warning"
                        : "ah-badge ah-badge-success";

                  return (
                    <article
                      key={item.id}
                      className={`ah-list-item${item.scheduled ? " is-scheduled" : ""}`}
                      data-category={item.category}
                      data-distance={item.distance}
                    >
                      <div className="ah-item-icon">{item.icon}</div>
                      <div>
                        <p className="ah-item-title">{item.title}</p>
                        <p className="ah-item-meta">{item.meta}</p>
                      </div>
                      <span className={badgeClass}>{item.badge}</span>
                      <button
                        className={`ah-btn ah-btn-outline ah-btn-sm ah-favorite-toggle${isFavorite ? " is-saved" : ""}`}
                        type="button"
                        aria-label={isFavorite ? `Remover ${item.title} dos salvos` : `Salvar ${item.title}`}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(item)}
                      >
                        {isFavorite ? "Salvo" : "Salvar"}
                      </button>
                      <button
                        className="ah-btn ah-btn-sm"
                        type="button"
                        data-schedule
                        disabled={item.scheduled}
                        aria-label={item.scheduled ? "Coleta agendada" : "Agendar coleta"}
                        onClick={() => handleSchedule(item.id)}
                      >
                        {item.scheduled ? "Agendado" : "Agendar"}
                      </button>
                    </article>
                  );
                })}
              </div>

              {visibleItems.length === 0 && (
                <p className="ah-empty mt-3 show" data-empty-state>
                  {showingFavorites
                    ? "Nenhum excedente salvo para esse filtro."
                    : "Nenhum excedente encontrado para esse filtro."}
                </p>
              )}
            </div>

            <div className="col-lg-4">
              <aside className="ah-panel mb-3">
                <h2 className="ah-card-title h5">Filtrar por distância</h2>
                <label className="form-label fw-bold" htmlFor="distancia">
                  Raio: <span data-range-label>{maxDistance}</span> km
                </label>
                <input
                  className="form-range"
                  id="distancia"
                  type="range"
                  min="10"
                  max="200"
                  value={maxDistance}
                  data-range
                  onChange={(event) => setMaxDistance(Number(event.target.value))}
                />
              </aside>

              <aside className="ah-panel">
                <h2 className="ah-card-title h5">Impacto gerado</h2>
                <p className="ah-text-muted mb-1">Famílias atendidas</p>
                <div className="ah-progress mb-3">
                  <span className="ah-progress-bar ah-w-72"></span>
                </div>
                <p className="ah-text-muted mb-1">Refeições estimadas</p>
                <div className="ah-progress">
                  <span className="ah-progress-bar ah-w-85"></span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
