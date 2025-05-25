const toggleThemeBtn = document.querySelector(".toggle-theme");
    const body = document.body;
    const icon = toggleThemeBtn.querySelector("i");

    // Carregar tema salvo no localStorage (se existir)
    const temaSalvo = localStorage.getItem("tema") || "light";
    if (temaSalvo === "dark") {
      body.classList.add("dark");
      icon.classList.replace("fa-moon", "fa-sun");
    }

    toggleThemeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("tema", "dark");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("tema", "light");
      }
    });

    // Validação básica e simulação do submit
    document.getElementById("formCadastro").addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = e.target.nome.value.trim();
      const email = e.target.email.value.trim();
      const usuario = e.target.usuario.value.trim();
      const senha = e.target.senha.value.trim();
      const confSenha = e.target.confSenha.value.trim();

      if (!nome || !email || !usuario || !senha || !confSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      if (senha !== confSenha) {
        alert("As senhas não coincidem.");
        return;
      }

      alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);
      e.target.reset();
    });

    // Links navegacionais com alertas personalizados
    document.getElementById("linkLogin").addEventListener("click", (e) => {
      e.preventDefault();
      alert("Você será redirecionado para a página de login.");
    });

    document.getElementById("linkEsqueciSenha").addEventListener("click", (e) => {
      e.preventDefault();
      alert("Você será redirecionado para a recuperação de senha.");
    });