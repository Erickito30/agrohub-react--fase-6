import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PitchSection from "../components/PitchSection.jsx";

const IMPACT_MULTIPLIERS = {
  hortifruti: 3,
  graos: 5,
  laticinios: 2,
};

export default function Home() {
  const [impact, setImpact] = useState({
    kg: 120,
    category: "hortifruti",
  });

  const impactData = useMemo(() => {
    const kg = Math.max(0, Number(impact.kg || 0));
    const multiplier = IMPACT_MULTIPLIERS[impact.category] || 3;
    const meals = Math.round(kg * multiplier);
    const families = meals > 0 ? Math.max(1, Math.round(meals / 4)) : 0;

    return {
      meals: meals.toLocaleString("pt-BR"),
      families: families.toLocaleString("pt-BR"),
      waste: `${kg.toLocaleString("pt-BR")} kg`,
    };
  }, [impact]);

  return (
    <>
      <section className="ah-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="ah-eyebrow">
                FIAP 2026 - Fase 6 PBL - Grupo 44
              </span>
              <h1 className="ah-title mb-3">
                AgroHub
              </h1>
              <p className="ah-lead mb-4">
                A AgroHub conecta pequenos produtores rurais a instituições
                sociais para destinar excedentes e alimentos fora do padrão
                comercial.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="ah-btn" to="/cadastro">
                  Participar da rede
                </Link>
                <button
                  className="ah-btn ah-btn-outline"
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("sobre")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Conhecer a solução
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-section" id="sobre">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <span className="ah-eyebrow">Visão geral</span>
              <h2 className="ah-section-title">
                ODS 2: Fome Zero e Agricultura Sustentável.
              </h2>
            </div>
            <div className="col-lg-7">
              <p className="fs-5 ah-text-muted">
                A plataforma reduz desperdício na origem e amplia o acesso à
                alimentação para pessoas em situação de vulnerabilidade. O
                projeto está alinhado às metas 2.1 e 2.3 da ODS 2.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-section ah-section-dark" id="problema">
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-lg-7">
              <span className="ah-eyebrow">O problema</span>
              <h2 className="ah-section-title">
                54,7 milhões de brasileiros enfrentam insegurança alimentar.
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="ah-lead">
                Ao mesmo tempo, produtores descartam excedentes por falta de
                estrutura, previsibilidade e tecnologia para coordenar doações.
              </p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <article className="ah-card">
                <span className="ah-step">1</span>
                <h3 className="ah-card-title h5">Produtor isolado</h3>
                <p className="ah-text-muted mb-0">
                  Baixo acesso à assistência técnica e dificuldade para dar
                  destino aos excedentes.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="ah-card">
                <span className="ah-step">2</span>
                <h3 className="ah-card-title h5">ONG sem previsibilidade</h3>
                <p className="ah-text-muted mb-0">
                  Instituições não sabem o que está disponível, onde está e
                  quando coletar.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="ah-card">
                <span className="ah-step">3</span>
                <h3 className="ah-card-title h5">Famílias sem acesso</h3>
                <p className="ah-text-muted mb-0">
                  Alimento seguro deixa de chegar à mesa por falta de uma ponte
                  operacional.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-section" id="solucao">
        <div className="container">
          <div className="row g-4 align-items-start mb-4">
            <div className="col-lg-6">
              <span className="ah-eyebrow">A solução</span>
              <h2 className="ah-section-title">
                Simples para quem usa, robusta para operar regionalmente.
              </h2>
            </div>
            <div className="col-lg-6">
              <p className="fs-5 ah-text-muted">
                O fluxo organiza cadastro, disponibilidade, agenda de coleta,
                histórico e indicadores de impacto.
              </p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">1,4 t</strong>
                <span className="ah-stat-label">alimentos redistribuídos</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">238</strong>
                <span className="ah-stat-label">famílias atendidas</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">12</strong>
                <span className="ah-stat-label">excedentes ativos</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="ah-stat">
                <strong className="ah-stat-number">4</strong>
                <span className="ah-stat-label">coletas agendadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-section ah-section-soft" id="simulador">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="ah-eyebrow">Simulador de impacto</span>
              <h2 className="ah-section-title">Simule o impacto de uma doação.</h2>
              <p className="ah-text-muted">
                Informe a quantidade aproximada de alimento disponível e veja uma
                estimativa de refeições e famílias atendidas. Os valores são
                ilustrativos para apoiar a decisão de produtores e ONGs.
              </p>
            </div>

            <div className="col-lg-7">
              <form
                className="ah-panel ah-impact-tool"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="row g-3 align-items-end">
                  <div className="col-md-5">
                    <label className="form-label fw-bold" htmlFor="impacto-kg">
                      Quantidade disponível
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control ah-form-control"
                        id="impacto-kg"
                        type="number"
                        min="1"
                        max="5000"
                        value={impact.kg}
                        onChange={(event) =>
                          setImpact((current) => ({
                            ...current,
                            kg: Number(event.target.value),
                          }))
                        }
                      />
                      <span className="input-group-text">kg</span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold" htmlFor="impacto-categoria">
                      Categoria
                    </label>
                    <select
                      className="form-select ah-form-control"
                      id="impacto-categoria"
                      value={impact.category}
                      onChange={(event) =>
                        setImpact((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                    >
                      <option value="hortifruti">Hortifruti</option>
                      <option value="graos">Grãos</option>
                      <option value="laticinios">Laticínios</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <button className="ah-btn w-100" type="submit">
                      Calcular
                    </button>
                  </div>
                </div>

                <div className="ah-impact-result mt-4" aria-live="polite">
                  <div>
                    <strong>{impactData.meals}</strong>
                    <span>refeições estimadas</span>
                  </div>
                  <div>
                    <strong>{impactData.families}</strong>
                    <span>famílias beneficiadas</span>
                  </div>
                  <div>
                    <strong>{impactData.waste}</strong>
                    <span>de alimento reaproveitado</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PitchSection />
    </>
  );
}
