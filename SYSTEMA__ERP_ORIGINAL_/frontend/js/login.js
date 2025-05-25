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

    // Form submit simulado
    document.getElementById("formLogin").addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = this.usuario.value.trim();
      const senha = this.senha.value.trim();

      if (!usuario || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Aqui você pode adicionar sua lógica real de autenticação

      alert(`Bem-vindo(a), ${usuario}! Login realizado com sucesso.`);
      this.reset();
    });

    // Links "Esqueci minha senha" e "Criar conta" - exemplos de mensagens personalizadas
    document.getElementById("esqueciSenha").addEventListener("click", (e) => {
      e.preventDefault();
      alert("Você será redirecionado para a página de recuperação de senha.");
    });

    document.getElementById("criarConta").addEventListener("click", (e) => {
      e.preventDefault();
      alert("Você será redirecionado para a página de cadastro.");
    });