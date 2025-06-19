// Alternância de tema (usa tema.js se já existir)
// Verificação mais segura para evitar erro de função não definida
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle && typeof window.alternarTema === 'function') {
    themeToggle.addEventListener('click', window.alternarTema);
  }
});

// Exibir/ocultar senha
const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');
if (senhaInput && toggleSenha) {
  toggleSenha.addEventListener('click', () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
    toggleSenha.innerHTML =
      senhaInput.type === 'password' ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
  });
}

// Validação e simulação de login
const form = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');
const lembrarMe = document.getElementById('lembrarMe');
const emailInput = document.getElementById('email');

// Preencher email salvo se lembrar-me
window.addEventListener('DOMContentLoaded', () => {
  const emailSalvo = localStorage.getItem('erp_login_email');
  if (emailSalvo && emailInput) {
    emailInput.value = emailSalvo;
    if (lembrarMe) {
      lembrarMe.checked = true;
    }
  }
});

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!emailInput.value.trim() || !senhaInput.value.trim()) {
      exibirMensagem('Por favor, preencha todos os campos.', 'erro');
      return;
    }
    if (!validarEmail(emailInput.value)) {
      exibirMensagem('E-mail inválido.', 'erro');
      return;
    }
    // Simulação de autenticação (substitua por integração real)
    if (emailInput.value === 'admin@erp.com' && senhaInput.value === '123456') {
      exibirMensagem('Login realizado com sucesso!', 'sucesso');
      if (lembrarMe && lembrarMe.checked) {
        localStorage.setItem('erp_login_email', emailInput.value);
      } else {
        localStorage.removeItem('erp_login_email');
      }
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    } else {
      exibirMensagem('E-mail ou senha incorretos.', 'erro');
    }
  });
}

function exibirMensagem(msg, tipo) {
  if (!mensagem) {
    return;
  }
  mensagem.textContent = msg;
  mensagem.className = 'mensagem ' + tipo;
  mensagem.style.display = 'block';
  setTimeout(() => {
    mensagem.style.display = 'none';
  }, 3000);
}

function validarEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const mensagemElement = document.getElementById('mensagemLogin');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  // Função para mostrar mensagens
  function mostrarMensagem(texto, tipo) {
    mensagemElement.textContent = texto;
    mensagemElement.className = `mensagem ${tipo} visivel`;

    setTimeout(() => {
      mensagemElement.className = 'mensagem';
    }, 5000);
  }

  // Função para validar email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função para validar senha
  function validarSenha(senha) {
    return senha.length >= 6;
  }

  // Manipulador do formulário
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;

    // Validações
    if (!validarEmail(email)) {
      mostrarMensagem('Por favor, insira um email válido.', 'erro');
      return;
    }

    if (!validarSenha(senha)) {
      mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
      return;
    }

    try {
      // Aqui você deve implementar a chamada para sua API
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, senha, lembrar }),
      // });

      // Simulação de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Limpar o formulário
      loginForm.reset();

      // Mostrar mensagem de sucesso
      mostrarMensagem('Login realizado com sucesso! Redirecionando...', 'sucesso');

      // Redirecionar após o login
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } catch (erro) {
      console.error('Erro ao realizar login:', erro);
      mostrarMensagem('Email ou senha incorretos. Tente novamente.', 'erro');
    }
  });

  // Toggle de visibilidade da senha
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('input');
      const icon = button.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Adicionar efeito de foco nos inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focado');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focado');
    });
  });
});
