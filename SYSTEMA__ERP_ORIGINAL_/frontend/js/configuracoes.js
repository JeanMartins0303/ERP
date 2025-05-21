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
