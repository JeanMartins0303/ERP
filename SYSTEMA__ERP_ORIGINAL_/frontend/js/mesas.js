// Estado global das mesas
let mesas = [];
let mesaSelecionada = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarMesas();
    configurarTema();
    configurarDragAndDrop();
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

// Gerenciamento de Mesas
function carregarMesas() {
    // Simular carregamento de mesas do backend
    mesas = [
        { id: 1, numero: 1, capacidade: 4, status: 'disponivel' },
        { id: 2, numero: 2, capacidade: 2, status: 'ocupada' },
        { id: 3, numero: 3, capacidade: 6, status: 'reservada' },
        { id: 4, numero: 4, capacidade: 4, status: 'disponivel' },
        { id: 5, numero: 5, capacidade: 8, status: 'manutencao' }
    ];

    atualizarEstatisticas();
    renderizarMesas();
}

function renderizarMesas() {
    const container = document.getElementById('mesasContainer');
    container.innerHTML = '';

    mesas.forEach(mesa => {
        const mesaElement = criarElementoMesa(mesa);
        container.appendChild(mesaElement);
    });
}

function criarElementoMesa(mesa) {
    const div = document.createElement('div');
    div.className = `mesa-card ${mesa.status}`;
    div.draggable = true;
    div.dataset.id = mesa.id;

    div.innerHTML = `
        <div class="mesa-acoes">
            <button class="btn-icon" onclick="editarMesa(${mesa.id})" title="Editar">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="excluirMesa(${mesa.id})" title="Excluir">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="mesa-numero">Mesa ${mesa.numero}</div>
        <div class="mesa-capacidade">${mesa.capacidade} lugares</div>
        <div class="mesa-status ${mesa.status}">${formatarStatus(mesa.status)}</div>
    `;

    div.addEventListener('click', () => selecionarMesa(mesa.id));
    return div;
}

function formatarStatus(status) {
    const statusMap = {
        'disponivel': 'Disponível',
        'ocupada': 'Ocupada',
        'reservada': 'Reservada',
        'manutencao': 'Manutenção'
    };
    return statusMap[status] || status;
}

function atualizarEstatisticas() {
    const total = mesas.length;
    const ocupadas = mesas.filter(m => m.status === 'ocupada').length;
    const disponiveis = mesas.filter(m => m.status === 'disponivel').length;
    const taxaOcupacao = total > 0 ? Math.round((ocupadas / total) * 100) : 0;

    document.getElementById('totalMesas').textContent = total;
    document.getElementById('mesasOcupadas').textContent = ocupadas;
    document.getElementById('mesasDisponiveis').textContent = disponiveis;
    document.getElementById('taxaOcupacao').textContent = `${taxaOcupacao}%`;
}

// Modal de Nova Mesa
function abrirModalNovaMesa() {
    const modal = document.getElementById('modalNovaMesa');
    modal.classList.add('active');
    document.getElementById('numeroMesa').focus();
}

function fecharModalNovaMesa() {
    const modal = document.getElementById('modalNovaMesa');
    modal.classList.remove('active');
    document.getElementById('formNovaMesa').reset();
}

function criarNovaMesa(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById('numeroMesa').value);
    const capacidade = parseInt(document.getElementById('capacidadeMesa').value);
    const status = document.getElementById('statusMesa').value;

    // Validar número único
    if (mesas.some(m => m.numero === numero)) {
        alert('Já existe uma mesa com este número!');
        return;
    }

    const novaMesa = {
        id: Date.now(), // Simular ID único
        numero,
        capacidade,
        status
    };

    mesas.push(novaMesa);
    atualizarEstatisticas();
    renderizarMesas();
    fecharModalNovaMesa();

    // Simular salvamento no backend
    console.log('Nova mesa criada:', novaMesa);
}

// Edição e Exclusão
function editarMesa(id) {
    const mesa = mesas.find(m => m.id === id);
    if (!mesa) return;

    mesaSelecionada = mesa;
    document.getElementById('numeroMesa').value = mesa.numero;
    document.getElementById('capacidadeMesa').value = mesa.capacidade;
    document.getElementById('statusMesa').value = mesa.status;

    abrirModalNovaMesa();
}

function excluirMesa(id) {
    if (!confirm('Tem certeza que deseja excluir esta mesa?')) return;

    mesas = mesas.filter(m => m.id !== id);
    atualizarEstatisticas();
    renderizarMesas();

    // Simular exclusão no backend
    console.log('Mesa excluída:', id);
}

function selecionarMesa(id) {
    const mesa = mesas.find(m => m.id === id);
    if (!mesa) return;

    // Implementar lógica de seleção de mesa
    console.log('Mesa selecionada:', mesa);
}

// Drag and Drop
function configurarDragAndDrop() {
    const container = document.getElementById('mesasContainer');

    container.addEventListener('dragover', e => {
        e.preventDefault();
        container.classList.add('drag-over');
    });

    container.addEventListener('dragleave', () => {
        container.classList.remove('drag-over');
    });

    container.addEventListener('drop', e => {
        e.preventDefault();
        container.classList.remove('drag-over');

        const mesaId = parseInt(e.dataTransfer.getData('text/plain'));
        const mesa = mesas.find(m => m.id === mesaId);
        if (!mesa) return;

        // Implementar lógica de reordenação
        console.log('Mesa movida:', mesa);
    });
}

// Layout
function salvarLayout() {
    // Implementar salvamento do layout
    console.log('Layout salvo');
    alert('Layout salvo com sucesso!');
}

function exportarLayout() {
    // Implementar exportação do layout
    const layout = {
        mesas,
        dataExportacao: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layout-mesas-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
} 