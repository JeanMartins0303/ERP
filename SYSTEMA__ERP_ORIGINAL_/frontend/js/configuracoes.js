document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formConfiguracoes');

  // Carregar configs existentes
  const dadosSalvos = JSON.parse(localStorage.getItem('configuracoes')) || {};

  if(dadosSalvos.nomeUsuario) document.getElementById('nomeUsuario').value = dadosSalvos.nomeUsuario;
  if(dadosSalvos.emailUsuario) document.getElementById('emailUsuario').value = dadosSalvos.emailUsuario;
  if(dadosSalvos.tema) document.getElementById('tema').value = dadosSalvos.tema;
  if(dadosSalvos.notificacoes) document.getElementById('notificacoes').value = dadosSalvos.notificacoes;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nomeUsuario = form.nomeUsuario.value.trim();
    const emailUsuario = form.emailUsuario.value.trim();
    const senhaUsuario = form.senhaUsuario.value.trim();
    const tema = form.tema.value;
    const notificacoes = form.notificacoes.value;

    if(!nomeUsuario || !emailUsuario) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Salvar no localStorage (senha não salva por simplicidade)
    const dadosParaSalvar = {
      nomeUsuario,
      emailUsuario,
      tema,
      notificacoes,
    };

    localStorage.setItem('configuracoes', JSON.stringify(dadosParaSalvar));

    alert('Configurações salvas com sucesso!');

    // Limpa campo senha
    form.senhaUsuario.value = '';
  });
});


document.getElementById('formConfiguracoes').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nomeUsuario').value.trim();
  const email = document.getElementById('emailUsuario').value.trim();
  const senha = document.getElementById('senhaUsuario').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha && senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const configuracoes = {
    nome,
    email,
    tema: document.getElementById('tema').value,
    idioma: document.getElementById('idioma').value,
    notificacoes: document.getElementById('notificacoes').value,
    verificacao2f: document.getElementById('verificacao2f').value
  };

  localStorage.setItem('configuracoesERP', JSON.stringify(configuracoes));

  document.getElementById('mensagem').innerText = '✅ Configurações salvas com sucesso!';
});


const form = document.getElementById('formConfiguracoes');
const mensagem = document.getElementById('mensagem');

// Confirmação e reset do localStorage
form.addEventListener('reset', function (e) {
  e.preventDefault(); // evita o reset imediato

  const confirmacao = confirm('Tem certeza que deseja redefinir as configurações para o padrão? Isso removerá suas preferências salvas.');

  if (confirmacao) {
    localStorage.removeItem('configuracoesUsuario'); // remove dados do localStorage
    form.reset(); // reseta visualmente o formulário

    mensagem.textContent = 'Configurações restauradas para o padrão.';
    mensagem.className = 'mensagem sucesso';
    mensagem.style.display = 'block';

    setTimeout(() => {
      mensagem.style.display = 'none';
    }, 4000);
  }
});




