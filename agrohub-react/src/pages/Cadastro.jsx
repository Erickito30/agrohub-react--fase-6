import { useState } from "react";
import PageIntro from "../components/PageIntro.jsx";

const TABS = [
  { id: "produtor", label: "Produtor" },
  { id: "ong", label: "ONG" },
  { id: "usuario", label: "Usuário" },
];

export default function Cadastro() {
  const [activeTab, setActiveTab] = useState("produtor");
  const [successByTab, setSuccessByTab] = useState({
    produtor: false,
    ong: false,
    usuario: false,
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    form.classList.remove("was-validated");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid")?.focus();
      return;
    }

    setSuccessByTab((current) => ({
      ...current,
      [activeTab]: true,
    }));

    form.reset();
    form.classList.remove("was-validated");
  };

  const clearSuccess = () => {
    setSuccessByTab((current) => ({
      ...current,
      [activeTab]: false,
    }));
  };

  const renderForm = (formId, fields, buttonLabel) => {
    const isActive = activeTab === formId;

    return (
      <form
        key={formId}
        className={`ah-panel-form${isActive ? "" : " d-none"}`}
        id={`painel-${formId}`}
        role="tabpanel"
        data-panel={formId}
        noValidate
        onSubmit={handleSubmit}
        onChange={clearSuccess}
      >
        <div className="row g-3">
          {fields.map((field) => (
            <div key={field.id} className={field.gridClassName || "col-md-6"}>
              <label className="form-label fw-bold" htmlFor={field.id}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="form-control ah-form-control"
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  rows={field.rows || 4}
                />
              ) : (
                <input
                  className="form-control ah-form-control"
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete}
                />
              )}
              <div className="invalid-feedback">{field.errorText}</div>
            </div>
          ))}

          <div className="col-12">
            <p
              className={`ah-success p-3 mb-3${successByTab[formId] ? "" : " d-none"}`}
              data-form-success
              hidden={!successByTab[formId]}
              role={successByTab[formId] ? "status" : undefined}
            >
              {buttonLabel === "Cadastrar produtor" &&
                "Cadastro de produtor recebido com sucesso."}
              {buttonLabel === "Cadastrar ONG" &&
                "Cadastro de ONG recebido com sucesso."}
              {buttonLabel === "Cadastrar usuário" &&
                "Cadastro de usuário recebido com sucesso."}
            </p>
            <button className="ah-btn" type="submit">
              {buttonLabel}
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <PageIntro eyebrow="Cadastro" title="Escolha seu perfil na rede AgroHub.">
        Produtores, ONGs e pessoas que querem participar de uma rede com menos desperdício.
      </PageIntro>

      <section className="ah-section">
        <div className="container">
          <div className="ah-panel">
            <div
              className="d-flex flex-wrap gap-2 mb-4"
              role="tablist"
              aria-label="Tipos de cadastro"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`ah-tab${activeTab === tab.id ? " active" : ""}`}
                  type="button"
                  role="tab"
                  aria-controls={`painel-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {renderForm("produtor", [
              {
                id: "produtor-nome",
                label: "Nome do produtor",
                type: "text",
                required: true,
                autoComplete: "name",
                errorText: "Informe o nome do produtor.",
              },
              {
                id: "produtor-alimento",
                label: "Alimento disponível",
                type: "text",
                placeholder: "Ex.: tomate",
                required: true,
                errorText: "Informe o alimento disponível.",
              },
              {
                id: "produtor-quantidade",
                label: "Quantidade",
                type: "text",
                placeholder: "Ex.: 80 kg",
                required: true,
                errorText: "Informe a quantidade aproximada.",
              },
              {
                id: "produtor-retirada",
                label: "Local de retirada",
                type: "text",
                autoComplete: "street-address",
                required: true,
                errorText: "Informe o local de retirada.",
              },
            ], "Cadastrar produtor")}

            {renderForm("ong", [
              {
                id: "ong-nome",
                label: "Nome da ONG",
                type: "text",
                autoComplete: "organization",
                required: true,
                errorText: "Informe o nome da ONG.",
              },
              {
                id: "ong-cnpj",
                label: "CNPJ",
                type: "text",
                required: true,
                errorText: "Informe o CNPJ.",
              },
              {
                id: "ong-email",
                label: "E-mail",
                type: "email",
                autoComplete: "email",
                required: true,
                errorText: "Informe um e-mail válido.",
              },
              {
                id: "ong-cidade",
                label: "Cidade",
                type: "text",
                autoComplete: "address-level2",
                required: true,
                errorText: "Informe a cidade da ONG.",
              },
            ], "Cadastrar ONG")}

            {renderForm("usuario", [
              {
                id: "usuario-nome",
                label: "Nome completo",
                type: "text",
                autoComplete: "name",
                required: true,
                errorText: "Informe o nome completo.",
              },
              {
                id: "usuario-email",
                label: "E-mail",
                type: "email",
                autoComplete: "email",
                required: true,
                errorText: "Informe um e-mail válido.",
              },
              {
                id: "usuario-cidade",
                label: "Cidade",
                type: "text",
                autoComplete: "address-level2",
                required: true,
                errorText: "Informe sua cidade.",
              },
              {
                id: "usuario-bairro",
                label: "Bairro",
                type: "text",
                autoComplete: "address-level3",
                required: true,
                errorText: "Informe seu bairro.",
              },
            ], "Cadastrar usuário")}
          </div>
        </div>
      </section>
    </>
  );
}
