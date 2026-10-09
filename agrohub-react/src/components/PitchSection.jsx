import {
  PHASE_6_VIDEO_URL,
  getPublicVideoUrl,
  previousPitches,
} from "../data/pitches.js";

export default function PitchSection() {
  const videoUrl = getPublicVideoUrl(PHASE_6_VIDEO_URL);

  return (
    <section className="ah-section ah-section-dark" id="pitch" aria-labelledby="pitch-title">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <span className="ah-eyebrow">Pitch vídeo · Fase 6</span>
            <h2 className="ah-section-title mb-3" id="pitch-title">AgroHub em evolução</h2>
            <p className="ah-lead">
              A nova etapa da conexão entre produtores rurais e instituições sociais.
            </p>
            {videoUrl ? (
              <a className="ah-btn" href={videoUrl} target="_blank" rel="noopener noreferrer">
                Assistir ao pitch da Fase 6
              </a>
            ) : (
              <p className="ah-lead mb-0">Vídeo da Fase 6 em preparação.</p>
            )}
          </div>
          <div className="col-lg-7">
            <h3 className="h5 mb-3">Apresentações anteriores</h3>
            <div className="row g-3">
              {previousPitches.map((pitch) => (
                <div className="col-md-6" key={pitch.phase}>
                  <article className="ah-pitch-card">
                    <span className="ah-badge ah-badge-success">Fase {pitch.phase}</span>
                    <h4 className="ah-card-title h5 mt-3">{pitch.title}</h4>
                    <p className="ah-text-muted">{pitch.description}</p>
                    <a className="ah-btn" href={pitch.url} target="_blank" rel="noopener noreferrer">
                      Assistir à Fase {pitch.phase}
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
