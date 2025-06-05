// Configurações - FlexBiz ERP

document.addEventListener('DOMContentLoaded', () => {
  configurarTema();
  carregarConfiguracoesSalvas();
  document.getElementById('formConfiguracoes').addEventListener('submit', salvarConfiguracoes);
  document.getElementById('logoEmpresa').addEventListener('change', mostrarLogoPreview);
});

function configurarTema() {
  const temaSalvo = localStorage.getItem('tema') || 'light';
  document.body.className = temaSalvo;
  atualizarIconeTema(temaSalvo);
  document.getElementById('btnToggleTema').onclick = () => {
    const temaAtual = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.className = temaAtual;
    localStorage.setItem('tema', temaAtual);
    atualizarIconeTema(temaAtual);
    document.getElementById('temaPadrao').value = temaAtual;
  };
  document.getElementById('temaPadrao').addEventListener('change', e => {
    document.body.className = e.target.value;
    localStorage.setItem('tema', e.target.value);
    atualizarIconeTema(e.target.value);
  });
}
function atualizarIconeTema(tema) {
  const btn = document.getElementById('btnToggleTema');
  btn.innerHTML = tema === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function salvarConfiguracoes(e) {
  e.preventDefault();
  const config = {
    nome: document.getElementById('nomeEmpresa').value,
    email: document.getElementById('emailEmpresa').value,
    telefone: document.getElementById('telefoneEmpresa').value,
    endereco: document.getElementById('enderecoEmpresa').value,
    tema: document.getElementById('temaPadrao').value,
    logo: '',
    idioma: document.getElementById('idiomaSistema').value,
    moeda: document.getElementById('moedaSistema').value,
    horario: document.getElementById('horarioPadrao').value,
    notificacoes: document.getElementById('notificacoesSistema').value,
    backup: document.getElementById('backupAutomatico').value,
    permissoes: document.getElementById('permissoesRapidas').value,
    exibirDicas: document.getElementById('exibirDicas').checked
  };
  const fileInput = document.getElementById('logoEmpresa');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      config.logo = evt.target.result;
      localStorage.setItem('configuracoesERP', JSON.stringify(config));
      mostrarMensagem('Configurações salvas com sucesso!', true);
      mostrarLogoPreview();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    const configSalva = JSON.parse(localStorage.getItem('configuracoesERP') || '{}');
    config.logo = configSalva.logo || '';
    localStorage.setItem('configuracoesERP', JSON.stringify(config));
    mostrarMensagem('Configurações salvas com sucesso!', true);
    mostrarLogoPreview();
  }
}

function carregarConfiguracoesSalvas() {
  const config = JSON.parse(localStorage.getItem('configuracoesERP') || '{}');
  if (config.nome) document.getElementById('nomeEmpresa').value = config.nome;
  if (config.email) document.getElementById('emailEmpresa').value = config.email;
  if (config.telefone) document.getElementById('telefoneEmpresa').value = config.telefone;
  if (config.endereco) document.getElementById('enderecoEmpresa').value = config.endereco;
  if (config.tema) {
    document.getElementById('temaPadrao').value = config.tema;
    document.body.className = config.tema;
    atualizarIconeTema(config.tema);
  }
  if (config.idioma) document.getElementById('idiomaSistema').value = config.idioma;
  if (config.moeda) document.getElementById('moedaSistema').value = config.moeda;
  if (config.horario) document.getElementById('horarioPadrao').value = config.horario;
  if (config.notificacoes) document.getElementById('notificacoesSistema').value = config.notificacoes;
  if (config.backup) document.getElementById('backupAutomatico').value = config.backup;
  if (config.permissoes) document.getElementById('permissoesRapidas').value = config.permissoes;
  if (typeof config.exibirDicas !== 'undefined') document.getElementById('exibirDicas').checked = config.exibirDicas;
  if (config.logo) mostrarLogoPreview(config.logo);
}

function mostrarLogoPreview(logoBase64) {
  let preview = document.getElementById('logoPreview');
  if (!preview) {
    preview = document.createElement('img');
    preview.id = 'logoPreview';
    preview.style.maxWidth = '120px';
    preview.style.maxHeight = '60px';
    preview.style.display = 'block';
    preview.style.marginTop = '0.5rem';
    document.getElementById('logoEmpresa').parentNode.appendChild(preview);
  }
  if (logoBase64) {
    preview.src = logoBase64;
    preview.style.display = 'block';
  } else {
    const fileInput = document.getElementById('logoEmpresa');
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        preview.src = evt.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      preview.style.display = 'none';
    }
  }
}

function mostrarMensagem(msg, sucesso) {
  let el = document.getElementById('msgConfig');
  if (!el) {
    el = document.createElement('div');
    el.id = 'msgConfig';
    el.style.marginTop = '1rem';
    el.style.fontWeight = '600';
    el.style.fontSize = '1rem';
    el.style.borderRadius = '6px';
    el.style.padding = '0.7rem 1.2rem';
    el.style.textAlign = 'center';
    document.getElementById('formConfiguracoes').appendChild(el);
  }
  el.textContent = msg;
  el.style.background = sucesso ? '#d1fae5' : '#fee2e2';
  el.style.color = sucesso ? '#065f46' : '#991b1b';
  el.style.border = sucesso ? '1px solid #22c55e' : '1px solid #ef4444';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
  el.style.display = 'block';
} 