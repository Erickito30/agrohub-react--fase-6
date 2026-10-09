import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";

const contactCards = [
  {
    icon: "E",
    title: "E-mail",
    body: (
      <a href="mailto:contato@agrohub.com.br">contato@agrohub.com.br</a>
    ),
  },
  {
    icon: "W",
    title: "Telefone / WhatsApp",
    body: (
      <>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer noopener">
          (11) 99999-9999
        </a>
        <p className="ah-contact-note">Segunda a sexta, das 8h às 18h.</p>
      </>
    ),
  },
  {
    icon: "L",
    title: "Localização",
    body: (
      <p>
        FIAP - São Paulo, SP
        <br />
        Brasil
      </p>
    ),
  },
  {
    icon: "24",
    title: "Tempo de resposta",
    body: (
      <>
        <p>
          Até <strong>24 horas úteis</strong>.
        </p>
        <p className="ah-contact-note">Atendimento prioritário para ONGs parceiras.</p>
      </>
    ),
  },
];

const faqItems = [
  {
    id: "faq1",
    question: "O AgroHub é gratuito para produtores e ONGs?",
    answer:
      "Sim. O objetivo do projeto é reduzir barreiras de acesso e facilitar a conexão entre quem tem excedentes e quem distribui alimentos.",
    open: true,
  },
  {
    id: "faq2",
    question: "Quanto tempo leva para receber uma resposta?",
    answer:
      "A previsão de retorno é de até 24 horas úteis. Demandas de coleta de ONGs parceiras recebem prioridade.",
  },
  {
    id: "faq3",
    question: "Como reportar um produto cadastrado incorretamente?",
    answer:
      "Use o assunto 'Reportar um problema' e descreva o alimento, o produtor e o erro encontrado. Assim a equipe consegue avaliar o caso.",
  },
  {
    id: "faq4",
    question: "Posso propor uma parceria institucional?",
    answer:
      "Sim. Selecione 'Proposta de parceria' no formulário e envie um resumo da ideia, da instituição e da região de atuação.",
  },
  {
    id: "faq5",
    question: "Meus dados pessoais ficam protegidos?",
    answer:
      "Os dados informados são usados apenas para responder a solicitação enviada pelo formulário de contato.",
  },
];

export default function Contato() {
  const [formState, setFormState] = useState({
    nome: "",
    email: "",
    perfil: "",
    assunto: "",
    mensagem: "",
    lgpd: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [openFaq, setOpenFaq] = useState("faq1");

  const charCount = useMemo(
    () => `${formState.mensagem.length} / 500`,
    [formState.mensagem.length]
  );

  const handleFieldChange = (field) => (event) => {
    const value =
      field === "lgpd" ? event.target.checked : event.target.value;

    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const validateName = (value) => {
    const normalized = value.trim().replace(/\s+/g, " ");
    const parts = normalized.split(" ").filter(Boolean);
    const allLetters = parts.every((part) => /^[A-Za-zÀ-ÿ'-]+$/.test(part));
    const validSize =
      parts.length >= 2 &&
      parts[0].length >= 2 &&
      parts[parts.length - 1].length >= 2;

    return normalized && parts.length >= 2 && validSize && allLetters;
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

  const validateMessage = (value) => value.trim().length > 0 && value.trim().length <= 500;

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const validName = validateName(formState.nome);
    const validEmail = validateEmail(formState.email);
    const validMessage = validateMessage(formState.mensagem);
    const validRequired =
      formState.perfil &&
      formState.assunto &&
      formState.lgpd &&
      validName &&
      validEmail &&
      validMessage;

    if (!validRequired || !form.checkValidity()) {
      setValidated(true);
      setSubmitted(false);
      return;
    }

    setValidated(false);
    setSubmitted(true);
    setFormState({
      nome: "",
      email: "",
      perfil: "",
      assunto: "",
      mensagem: "",
      lgpd: false,
    });
  };

  const isNameInvalid = formState.nome.trim() !== "" && !validateName(formState.nome);
  const isEmailInvalid = formState.email.trim() !== "" && !validateEmail(formState.email);
  const isMessageInvalid = formState.mensagem.trim() !== "" && !validateMessage(formState.mensagem);

  return (
    <>
      <PageIntro eyebrow="Suporte e contato" title="Fale com a equipe AgroHub.">
        Tire dúvidas, reporte problemas, proponha parcerias ou envie
        sugestões para melhorar a plataforma. Respondemos em até 24 horas úteis.
      </PageIntro>

      <section className="ah-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              {contactCards.map((card) => (
                <aside key={card.title} className="ah-contact-card">
                  <div className="ah-contact-icon">{card.icon}</div>
                  <div>
                    <h2 className="ah-contact-title">{card.title}</h2>
                    {card.body}
                  </div>
                </aside>
              ))}
            </div>

            <div className="col-lg-8">
              <form
                className={`ah-panel${validated ? " was-validated" : ""}`}
                id="form-contato"
                data-ah-form
                data-contact-form
                noValidate
                onSubmit={handleSubmit}
              >
                <span className="ah-eyebrow">Formulário de contato</span>
                <h2 className="ah-section-title mb-2">Envie sua mensagem</h2>
                <p className="ah-text-muted mb-4">
                  Preencha os campos abaixo para que a equipe consiga responder
                  com mais agilidade.
                </p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold" htmlFor="nome">
                      Nome completo
                    </label>
                    <input
                      className={`form-control ah-form-control${
                        isNameInvalid ? " is-invalid" : ""
                      }`}
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      data-contact-name
                      aria-describedby="nome-ajuda"
                      required
                      value={formState.nome}
                      onChange={handleFieldChange("nome")}
                    />
                    <div className="form-text" id="nome-ajuda">
                      Informe nome e sobrenome, com pelo menos duas letras em cada parte.
                    </div>
                    <div className="invalid-feedback">
                      Informe nome e sobrenome com pelo menos duas letras cada.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      className={`form-control ah-form-control${
                        isEmailInvalid ? " is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      data-contact-email
                      required
                      value={formState.email}
                      onChange={handleFieldChange("email")}
                    />
                    <div className="invalid-feedback">Informe um e-mail válido.</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold" htmlFor="perfil">
                      Você é
                    </label>
                    <select
                      className="form-select ah-form-control"
                      id="perfil"
                      name="perfil"
                      required
                      value={formState.perfil}
                      onChange={handleFieldChange("perfil")}
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="produtor">Produtor rural</option>
                      <option value="ong">ONG ou organização social</option>
                      <option value="usuario">Usuário beneficiário</option>
                      <option value="parceiro">Parceiro ou empresa</option>
                      <option value="imprensa">Imprensa</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="invalid-feedback">Selecione seu perfil.</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold" htmlFor="assunto">
                      Assunto
                    </label>
                    <select
                      className="form-select ah-form-control"
                      id="assunto"
                      name="assunto"
                      required
                      value={formState.assunto}
                      onChange={handleFieldChange("assunto")}
                    >
                      <option value="">Selecione o assunto</option>
                      <option value="duvida">Dúvida sobre a plataforma</option>
                      <option value="cadastro">Problema no cadastro</option>
                      <option value="coleta">Agendamento de coleta</option>
                      <option value="parceria">Proposta de parceria</option>
                      <option value="imprensa">Solicitação de imprensa</option>
                      <option value="feedback">Feedback ou sugestão</option>
                      <option value="bug">Reportar um problema</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div className="invalid-feedback">Selecione o assunto.</div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold" htmlFor="mensagem">
                      Mensagem
                    </label>
                    <textarea
                      className={`form-control ah-form-control${
                        isMessageInvalid ? " is-invalid" : ""
                      }`}
                      id="mensagem"
                      name="mensagem"
                      rows="6"
                      maxLength="500"
                      data-char-source
                      data-contact-message
                      aria-describedby="mensagem-ajuda"
                      required
                      value={formState.mensagem}
                      onChange={handleFieldChange("mensagem")}
                    />
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-1 mt-1">
                      <div className="form-text" id="mensagem-ajuda">
                        Descreva sua solicitação com até 500 caracteres.
                      </div>
                      <div
                        className={`ah-char-counter${
                          formState.mensagem.length > 400 ? " warning" : ""
                        }`}
                        data-char-counter
                      >
                        {charCount}
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Descreva sua mensagem em até 500 caracteres.
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check ah-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="lgpd"
                        name="lgpd"
                        required
                        checked={formState.lgpd}
                        onChange={handleFieldChange("lgpd")}
                      />
                      <label className="form-check-label" htmlFor="lgpd">
                        Concordo com o uso dos meus dados para resposta a esta
                        solicitação.
                      </label>
                      <div className="invalid-feedback">
                        Aceite o uso dos dados para continuar.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    {submitted && (
                      <p className="ah-success p-3 mb-3" id="form-success" data-form-success role="status">
                        Mensagem enviada com sucesso. Em breve nossa equipe entrará em contato.
                      </p>
                    )}
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <button className="ah-btn" type="submit">
                        Enviar mensagem
                      </button>
                      <span className="ah-required-note">Todos os campos são obrigatórios.</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-section ah-section-soft">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <span className="ah-eyebrow">Dúvidas frequentes</span>
              <h2 className="ah-section-title">Perguntas e respostas</h2>
              <p className="ah-text-muted">
                Respostas rápidas para os pontos mais comuns sobre cadastro,
                coletas e segurança de dados.
              </p>
            </div>

            <div className="col-lg-8">
              <div className="accordion ah-faq" id="faqContato">
                {faqItems.map((item) => {
                  const isOpen = openFaq === item.id;

                  return (
                    <div key={item.id} className="accordion-item">
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button${isOpen ? "" : " collapsed"}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={item.id}
                          onClick={() =>
                            setOpenFaq((current) =>
                              current === item.id ? "" : item.id
                            )
                          }
                        >
                          {item.question}
                        </button>
                      </h3>
                      <div
                        id={item.id}
                        className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
                      >
                        <div className="accordion-body">{item.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ah-contact-cta">
        <div className="container text-center">
          <h2 className="ah-section-title">Pronto para fazer parte da solução?</h2>
          <p>Cadastre-se gratuitamente e ajude a transformar excedente em impacto real.</p>
          <Link className="ah-btn" to="/cadastro">
            Quero participar
          </Link>
        </div>
      </section>
    </>
  );
}
