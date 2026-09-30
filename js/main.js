const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setupMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#menu-principal");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.querySelector(".sr-only").textContent = isOpen ? "Fechar menu" : "Abrir menu";
  });

  $$("#menu-principal a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".sr-only").textContent = "Abrir menu";
    });
  });
}

function setupTheme() {
  const toggle = $(".theme-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("ong-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Desativar modo escuro");
  }

  toggle.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    localStorage.setItem("ong-theme", dark ? "dark" : "light");
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Desativar modo escuro" : "Ativar modo escuro");
  });
}

function setupProjectDialog() {
  const dialog = $("#support-dialog");
  if (!dialog) return;

  const message = $("#dialog-message");
  $$(".project-action").forEach((button) => {
    button.addEventListener("click", () => {
      message.textContent = `Você selecionou o projeto "${button.dataset.project}". Cadastre-se para receber informações sobre como participar.`;
      dialog.showModal();
    });
  });

  $(".modal-close", dialog)?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupForm() {
  const form = $("#volunteer-form");
  if (!form) return;

  const status = $("#form-status");

  const fields = ["nome", "email", "nascimento", "cep", "cidade", "estado", "telefone", "area", "consentimento"];

  function clearErrors() {
    fields.forEach((name) => {
      const field = $(`#${name}`);
      const error = $(`#${name}-error`);
      if (field) field.classList.remove("input-error");
      if (error) error.textContent = "";
    });
    status.textContent = "";
    status.className = "form-status";
  }

  function showError(name, message) {
    const field = $(`#${name}`);
    const error = $(`#${name}-error`);
    if (field) field.classList.add("input-error");
    if (error) error.textContent = message;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    fields.forEach((name) => {
      const field = $(`#${name}`);
      if (!field) return;

      if (!field.checkValidity()) {
        valid = false;
        if (name === "nome") showError(name, "Informe seu nome completo.");
        else if (name === "email") showError(name, "Digite um e-mail válido.");
        else if (name === "nascimento") showError(name, "Informe sua data de nascimento.");
        else if (name === "cep") showError(name, "Informe um CEP válido no formato 00000-000.");
        else if (name === "cidade") showError(name, "Informe sua cidade.");
        else if (name === "estado") showError(name, "Selecione seu estado.");
        else if (name === "telefone") showError(name, "Informe um telefone válido.");
        else if (name === "area") showError(name, "Selecione uma área de interesse.");
        else if (name === "consentimento") showError(name, "É necessário aceitar o contato.");
      }
    });

    if (!valid) {
      status.textContent = "Revise os campos destacados antes de enviar.";
      status.className = "form-status error";
      $(".input-error")?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    data.consentimento = $("#consentimento").checked;
    localStorage.setItem("ong-volunteer", JSON.stringify(data));

    status.textContent = "Cadastro enviado com sucesso! Seus dados foram salvos neste navegador para fins demonstrativos.";
    status.className = "form-status success";
    form.reset();
  });

  const saved = localStorage.getItem("ong-volunteer");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.nome) $("#nome").value = data.nome;
      if (data.email) $("#email").value = data.email;
      if (data.cidade) $("#cidade").value = data.cidade;
      if (data.estado) $("#estado").value = data.estado;
      if (data.telefone) $("#telefone").value = data.telefone;
      if (data.area) $("#area").value = data.area;
      if (data.mensagem) $("#mensagem").value = data.mensagem;
    } catch {
      localStorage.removeItem("ong-volunteer");
    }
  }
}

function setupYear() {
  $$("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

setupMenu();
setupTheme();
setupProjectDialog();
setupForm();
setupYear();
