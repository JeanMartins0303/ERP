// Estado global dos clientes
let clientes = [];
let clienteSelecionado = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();
    configurarTema();
    configurarBusca();
    configurarMascaras();
});

// Configuração do tema
function configurarTema() {
    const btnToggleTema = document.getElementById('btnToggleTema');
    const body = document.body;
    const icon = btnToggleTema.querySelector('i');

    // Verificar tema salvo
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        body.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    btnToggleTema.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('tema', isDark ? 'dark' : 'light');
        icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    });
}

// Configuração de máscaras
function configurarMascaras() {
    const cpfInput = document.getElementById('cpfCliente');
    const telefoneInput = document.getElementById('telefoneCliente');

    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });

    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            e.target.value = value;
        }
    });
}

// Configuração da busca
function configurarBusca() {
    const searchInput = document.getElementById('searchClient');
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const clientesFiltrados = clientes.filter(cliente => 
            cliente.nome.toLowerCase().includes(termo) ||
            cliente.email.toLowerCase().includes(termo) ||
            cliente.telefone.includes(termo)
        );
        renderizarClientes(clientesFiltrados);
    });
}

// Gerenciamento de Clientes
function carregarClientes() {
    // Simular carregamento de clientes do backend
    clientes = [
        {
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            telefone: '(11) 98765-4321',
            status: 'ativo',
            ultimaVisita: '2024-03-15',
            cpf: '123.456.789-00',
            endereco: 'Rua das Flores, 123',
            cidade: 'São Paulo',
            estado: 'SP',
            observacoes: 'Cliente preferencial'
        },
        {
            id: 2,
            nome: 'Maria Santos',
            email: 'maria.santos@email.com',
            telefone: '(11) 91234-5678',
            status: 'ativo',
            ultimaVisita: '2024-03-14',
            cpf: '987.654.321-00',
            endereco: 'Av. Principal, 456',
            cidade: 'São Paulo',
            estado: 'SP',
            observacoes: ''
        },
        {
            id: 3,
            nome: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            telefone: '(11) 99876-5432',
            status: 'inativo',
            ultimaVisita: '2024-02-28',
            cpf: '456.789.123-00',
            endereco: 'Rua dos Pinheiros, 789',
            cidade: 'São Paulo',
            estado: 'SP',
            observacoes: 'Cliente inativo há 30 dias'
        }
    ];

    atualizarEstatisticas();
    renderizarClientes(clientes);
}

function renderizarClientes(clientesParaRenderizar = clientes) {
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';

    clientesParaRenderizar.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td><span class="status-badge ${cliente.status}">${formatarStatus(cliente.status)}</span></td>
            <td>${formatarData(cliente.ultimaVisita)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="editarCliente(${cliente.id})" data-tooltip="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="visualizarCliente(${cliente.id})" data-tooltip="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="excluirCliente(${cliente.id})" data-tooltip="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function formatarStatus(status) {
    return status === 'ativo' ? 'Ativo' : 'Inativo';
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function atualizarEstatisticas() {
    const total = clientes.length;
    const ativos = clientes.filter(c => c.status === 'ativo').length;
    const inativos = clientes.filter(c => c.status === 'inativo').length;
    const novos = clientes.filter(c => {
        const dataCadastro = new Date(c.ultimaVisita);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - dataCadastro);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }).length;

    document.getElementById('totalClientes').textContent = total;
    document.getElementById('clientesAtivos').textContent = ativos;
    document.getElementById('clientesInativos').textContent = inativos;
    document.getElementById('novosClientes').textContent = novos;
}

// Modal de Novo Cliente
function abrirModalNovoCliente() {
    const modal = document.getElementById('modalNovoCliente');
    modal.classList.add('active');
    document.getElementById('nomeCliente').focus();
}

function fecharModalNovoCliente() {
    const modal = document.getElementById('modalNovoCliente');
    modal.classList.remove('active');
    document.getElementById('formNovoCliente').reset();
    clienteSelecionado = null;
}

function criarNovoCliente(event) {
    event.preventDefault();

    const cliente = {
        id: clienteSelecionado ? clienteSelecionado.id : Date.now(),
        nome: document.getElementById('nomeCliente').value,
        email: document.getElementById('emailCliente').value,
        telefone: document.getElementById('telefoneCliente').value,
        cpf: document.getElementById('cpfCliente').value,
        endereco: document.getElementById('enderecoCliente').value,
        cidade: document.getElementById('cidadeCliente').value,
        estado: document.getElementById('estadoCliente').value,
        observacoes: document.getElementById('observacoesCliente').value,
        status: 'ativo',
        ultimaVisita: new Date().toISOString().split('T')[0]
    };

    if (clienteSelecionado) {
        // Atualizar cliente existente
        const index = clientes.findIndex(c => c.id === clienteSelecionado.id);
        clientes[index] = cliente;
    } else {
        // Adicionar novo cliente
        clientes.push(cliente);
    }

    atualizarEstatisticas();
    renderizarClientes();
    fecharModalNovoCliente();

    // Simular salvamento no backend
    console.log('Cliente salvo:', cliente);
}

// Edição e Exclusão
function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    clienteSelecionado = cliente;
    document.getElementById('nomeCliente').value = cliente.nome;
    document.getElementById('emailCliente').value = cliente.email;
    document.getElementById('telefoneCliente').value = cliente.telefone;
    document.getElementById('cpfCliente').value = cliente.cpf;
    document.getElementById('enderecoCliente').value = cliente.endereco;
    document.getElementById('cidadeCliente').value = cliente.cidade;
    document.getElementById('estadoCliente').value = cliente.estado;
    document.getElementById('observacoesCliente').value = cliente.observacoes;

    abrirModalNovoCliente();
}

function visualizarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    // Implementar visualização detalhada do cliente
    console.log('Visualizar cliente:', cliente);
}

function excluirCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    clientes = clientes.filter(c => c.id !== id);
    atualizarEstatisticas();
    renderizarClientes();

    // Simular exclusão no backend
    console.log('Cliente excluído:', id);
}

// Exportação e Impressão
function exportarClientes() {
    const dados = {
        clientes,
        dataExportacao: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clientes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function imprimirLista() {
    window.print();
} 