// Dados simulados
let estoque = [
    { codigo: 'P001', nome: 'Arroz 5kg', categoria: 'Alimentos', qtd: 12, minimo: 5, valor: 22.90 },
    { codigo: 'P002', nome: 'Feijão 1kg', categoria: 'Alimentos', qtd: 3, minimo: 8, valor: 8.50 },
    { codigo: 'P003', nome: 'Coca-Cola 2L', categoria: 'Bebidas', qtd: 0, minimo: 4, valor: 9.99 },
    { codigo: 'P004', nome: 'Detergente', categoria: 'Limpeza', qtd: 7, minimo: 3, valor: 2.99 },
    { codigo: 'P005', nome: 'Cerveja Lata', categoria: 'Bebidas', qtd: 15, minimo: 10, valor: 3.50 }
  ];
  let categorias = ['Alimentos', 'Bebidas', 'Limpeza'];
  
  let editando = null;
  
  // Utilitários
  function formatarValor(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function gerarCodigo() {
    let max = 0;
    estoque.forEach(e => {
      let num = parseInt(e.codigo.replace(/\D/g, ''));
      if (num > max) max = num;
    });
    return 'P' + String(max + 1).padStart(3, '0');
  }
  function statusItem(item) {
    if (item.qtd === 0) return 'zerado';
    if (item.qtd <= item.minimo) return 'baixo';
    return 'ok';
  }
  
  // Cards de resumo
  function atualizarCards() {
    document.getElementById('totalItens').textContent = estoque.length;
    document.getElementById('itensAbaixoMinimo').textContent = estoque.filter(e => statusItem(e) !== 'ok').length;
    let total = estoque.reduce((acc, e) => acc + (e.qtd * e.valor), 0);
    document.getElementById('valorTotalEstoque').textContent = formatarValor(total);
  }
  
  // Preencher categorias nos filtros
  function preencherCategorias() {
    const select = document.getElementById('filtroCategoria');
    select.innerHTML = '<option value="">Todas as categorias</option>';
    categorias.forEach(cat => {
      select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  }
  
  // Renderizar tabela
  function renderizarTabela() {
    const tbody = document.getElementById('estoqueTableBody');
    tbody.innerHTML = '';
    let busca = document.getElementById('busca').value.toLowerCase();
    let cat = document.getElementById('filtroCategoria').value;
    let status = document.getElementById('filtroStatus').value;
  
    estoque.forEach(item => {
      if (
        (busca && !item.nome.toLowerCase().includes(busca) && !item.codigo.toLowerCase().includes(busca)) ||
        (cat && item.categoria !== cat) ||
        (status && statusItem(item) !== status)
      ) return;
  
      tbody.innerHTML += `
        <tr>
          <td>${item.codigo}</td>
          <td>${item.nome}</td>
          <td>${item.categoria}</td>
          <td>${item.qtd}</td>
          <td>${item.minimo}</td>
          <td>${formatarValor(item.valor)}</td>
          <td><span class="status ${statusItem(item)}">${statusItem(item).toUpperCase()}</span></td>
          <td>
            <button class="acao-btn" title="Editar" onclick="abrirModal('${item.codigo}')"><i class="fas fa-edit"></i></button>
            <button class="acao-btn" title="Excluir" onclick="excluirItem('${item.codigo}')"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `;
    });
  }
  
  // Modal
  function abrirModal(codigo = null) {
    document.getElementById('modalItemBg').classList.add('ativo');
    document.getElementById('formItem').reset();
    if (codigo) {
      editando = estoque.find(e => e.codigo === codigo);
      document.getElementById('modalTitulo').textContent = 'Editar Item';
      document.getElementById('itemCodigo').value = editando.codigo;
      document.getElementById('itemNome').value = editando.nome;
      document.getElementById('itemCategoria').value = editando.categoria;
      document.getElementById('itemQtd').value = editando.qtd;
      document.getElementById('itemMinimo').value = editando.minimo;
      document.getElementById('itemValor').value = editando.valor;
    } else {
      editando = null;
      document.getElementById('modalTitulo').textContent = 'Novo Item';
      document.getElementById('itemCodigo').value = gerarCodigo();
    }
    document.getElementById('itemNome').focus();
  }
  function fecharModal() {
    document.getElementById('modalItemBg').classList.remove('ativo');
  }
  
  // Salvar item
  document.getElementById('formItem').onsubmit = function(e) {
    e.preventDefault();
    const codigo = document.getElementById('itemCodigo').value;
    const nome = document.getElementById('itemNome').value.trim();
    const categoria = document.getElementById('itemCategoria').value.trim();
    const qtd = parseInt(document.getElementById('itemQtd').value);
    const minimo = parseInt(document.getElementById('itemMinimo').value);
    const valor = parseFloat(document.getElementById('itemValor').value);
  
    if (!nome || !categoria || isNaN(qtd) || isNaN(minimo) || isNaN(valor)) {
      notificar('Preencha todos os campos corretamente!', true);
      return;
    }
    if (editando) {
      Object.assign(editando, { nome, categoria, qtd, minimo, valor });
      notificar('Item atualizado com sucesso!');
    } else {
      estoque.push({ codigo, nome, categoria, qtd, minimo, valor });
      if (!categorias.includes(categoria)) {
        categorias.push(categoria);
        preencherCategorias();
      }
      notificar('Item cadastrado com sucesso!');
    }
    fecharModal();
    atualizarCards();
    renderizarTabela();
  };
  
  // Excluir item
  function excluirItem(codigo) {
    if (confirm('Deseja realmente excluir este item?')) {
      estoque = estoque.filter(e => e.codigo !== codigo);
      atualizarCards();
      renderizarTabela();
      notificar('Item excluído!');
    }
  }
  
  // Notificação
  function notificar(msg, erro = false) {
    const n = document.getElementById('notificacao');
    n.textContent = msg;
    n.style.background = erro ? '#ff5e5e' : 'var(--cor-gradiente)';
    n.classList.add('ativo');
    setTimeout(() => n.classList.remove('ativo'), 2500);
  }
  
  // Eventos
  document.getElementById('novoItemBtn').onclick = () => abrirModal();
  document.getElementById('cancelarModal').onclick = fecharModal;
  document.getElementById('modalItemBg').onclick = function(e) {
    if (e.target === this) fecharModal();
  };
  ['busca', 'filtroCategoria', 'filtroStatus'].forEach(id => {
    document.getElementById(id).oninput = renderizarTabela;
  });
  
  // Tema claro/escuro
  document.getElementById('themeToggle').onclick = function() {
    const html = document.documentElement;
    const dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
    this.innerHTML = dark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  };
  
  // Inicialização
  preencherCategorias();
  atualizarCards();
  renderizarTabela();