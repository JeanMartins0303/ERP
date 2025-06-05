// FAQ dinâmico
const faqs = [
  {
    pergunta: 'Como redefinir minha senha?',
    resposta: 'Acesse Configurações > Usuários, selecione seu usuário e clique em "Redefinir Senha". Siga as instruções enviadas para seu e-mail cadastrado.'
  },
  {
    pergunta: 'Como exportar relatórios?',
    resposta: 'Vá até a tela de Relatórios, utilize os filtros desejados e clique em "Exportar" para gerar um arquivo em PDF ou Excel.'
  },
  {
    pergunta: 'Como cadastrar um novo usuário?',
    resposta: 'Acesse a tela de Usuários, clique em "Novo Usuário", preencha os dados e salve. O novo usuário receberá um e-mail de boas-vindas.'
  },
  {
    pergunta: 'Como alterar o tema do sistema?',
    resposta: 'Clique no ícone de lua/sol no topo direito para alternar entre tema claro e escuro instantaneamente.'
  },
  {
    pergunta: 'Como realizar backup dos dados?',
    resposta: 'Em Configurações > Avançado, ative o backup automático ou clique em "Fazer Backup Agora" para salvar uma cópia dos dados.'
  },
  {
    pergunta: 'Como configurar o PDV?',
    resposta: 'Acesse Configurações > PDV para configurar impressoras, formas de pagamento, taxas e outras opções do ponto de venda.'
  },
  {
    pergunta: 'Como gerenciar o estoque?',
    resposta: 'Na tela de Estoque você pode registrar entradas, saídas, ajustes de inventário e configurar alertas de estoque baixo.'
  },
  {
    pergunta: 'Como emitir notas fiscais?',
    resposta: 'Após finalizar uma venda no PDV, clique em "Emitir NF-e" e preencha os dados fiscais necessários.'
  }
];

function renderFAQ() {
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = '';
  faqs.forEach((faq, idx) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-pergunta">${faq.pergunta}</div>
      <div class="faq-resposta">${faq.resposta}</div>
    `;
    item.addEventListener('click', function() {
      this.classList.toggle('ativo');
    });
    faqList.appendChild(item);
  });
}

// Formulário de contato
const formAjuda = document.getElementById('formAjuda');
const mensagemEnvio = document.getElementById('mensagemEnvioAjuda');

formAjuda.addEventListener('submit', function(e) {
  e.preventDefault();
  mensagemEnvio.className = '';
  mensagemEnvio.style.display = 'none';

  const nome = document.getElementById('nomeAjuda').value.trim();
  const email = document.getElementById('emailAjuda').value.trim();
  const assunto = document.getElementById('assuntoAjuda').value;
  const mensagem = document.getElementById('mensagemAjuda').value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    mensagemEnvio.textContent = 'Por favor, preencha todos os campos.';
    mensagemEnvio.className = 'erro';
    mensagemEnvio.style.display = 'block';
    return;
  }

  // Simula envio (poderia ser integrado a backend/API)
  setTimeout(() => {
    mensagemEnvio.textContent = 'Mensagem enviada com sucesso! Nossa equipe retornará em breve.';
    mensagemEnvio.className = 'sucesso';
    mensagemEnvio.style.display = 'block';
    formAjuda.reset();
  }, 900);
});

// Status do Sistema
function atualizarStatus() {
  const statusCards = document.querySelectorAll('.status-card');
  
  // Simula verificação de status (poderia ser integrado a API)
  statusCards.forEach(card => {
    const indicator = card.querySelector('.status-indicator');
    const random = Math.random();
    
    if (random > 0.8) {
      indicator.className = 'status-indicator warning';
      indicator.innerHTML = '<span class="status-dot"></span>Instável';
    } else if (random > 0.9) {
      indicator.className = 'status-indicator offline';
      indicator.innerHTML = '<span class="status-dot"></span>Offline';
    } else {
      indicator.className = 'status-indicator online';
      indicator.innerHTML = '<span class="status-dot"></span>Online';
    }
  });
}

// Atualiza status a cada 30 segundos
setInterval(atualizarStatus, 30000);

// Alternância de tema
const btnToggleTema = document.getElementById('btnToggleTema');
btnToggleTema.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('tema', document.body.classList.contains('dark') ? 'dark' : 'light');
  atualizarIconeTema();
});

function atualizarIconeTema() {
  const icone = btnToggleTema.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icone.classList.remove('fa-moon');
    icone.classList.add('fa-sun');
  } else {
    icone.classList.remove('fa-sun');
    icone.classList.add('fa-moon');
  }
}

// Carregar tema salvo
(function () {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
  }
  atualizarIconeTema();
})();

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  if (menuToggle.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark', 'close-icon');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
  } else {
    icon.classList.remove('fa-xmark', 'close-icon');
    icon.classList.add('fa-bars');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderFAQ();
  atualizarStatus();
  
  // Adiciona efeito hover nos cards
  const cards = document.querySelectorAll('.manual-card, .suporte-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});
