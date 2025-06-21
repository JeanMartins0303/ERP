# 🎨 Guia do Template Padrão - CorelSys ERP

## 📋 Visão Geral

O arquivo `template-padrao.html` serve como base para todas as novas telas do sistema ERP. Ele contém:

- **Design System Completo** baseado na tela `financeiro.html`
- **Componentes Reutilizáveis** (cards, tabelas, modais, formulários)
- **Funcionalidades Base** (sidebar, tema, notificações, loading)
- **Responsividade** para mobile e desktop
- **Tema Claro/Escuro** com persistência

## 🚀 Como Usar o Template

### 1. Criação de Nova Tela

```bash
# 1. Copie o template
cp template-padrao.html nova-tela.html

# 2. Edite o título da página
<title>CorelSys ERP - Nome da Nova Tela</title>

# 3. Personalize o conteúdo específico da tela
```

### 2. Personalização Básica

#### Alterar Título da Página
```html
<title>CorelSys ERP - Gestão de Funcionários</title>
```

#### Definir Item Ativo no Sidebar
```html
<a href="funcionarios.html" class="sidebar-nav-item active">
    <i class="fas fa-user-tie"></i> Funcionários
</a>
```

#### Personalizar Botão Principal
```html
<button class="header-btn primary" onclick="openModal()">
    <i class="fas fa-plus"></i> Novo Funcionário
</button>
```

## 🎯 Componentes Disponíveis

### 1. Cards de Estatísticas (Stats Grid)

```html
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-header">
            <div class="stat-icon" style="background: linear-gradient(135deg, var(--stat-color-1), #16a34a);">
                <i class="fas fa-users"></i>
            </div>
            <div class="stat-trend positive">
                <i class="fas fa-arrow-up"></i>
                +15.2%
            </div>
        </div>
        <div class="stat-content">
            <div class="stat-main">
                <div class="stat-value">1.234</div>
                <div class="stat-label">Total de Funcionários</div>
            </div>
        </div>
    </div>
</div>
```

**Cores Disponíveis:**
- `var(--stat-color-1)` - Verde (#22c55e)
- `var(--stat-color-2)` - Vermelho (#ef4444)
- `var(--stat-color-3)` - Azul (#3b82f6)
- `var(--stat-color-4)` - Laranja (#f97316)

### 2. Cards de Conteúdo

```html
<div class="content-grid">
    <!-- Card de Tabela -->
    <div class="table-card">
        <div class="card-header">
            <h2 class="card-title">Lista de Funcionários</h2>
            <div class="table-controls">
                <!-- Controles da tabela -->
            </div>
        </div>
        <table class="table">
            <!-- Conteúdo da tabela -->
        </table>
    </div>

    <!-- Card de Gráfico -->
    <div class="chart-card">
        <div class="card-header">
            <h2 class="card-title">Gráfico de Funcionários</h2>
        </div>
        <div class="chart-container">
            <canvas id="mainChart"></canvas>
        </div>
    </div>
</div>
```

### 3. Controles de Tabela

```html
<div class="table-controls">
    <div class="search-wrapper">
        <input type="text" class="search-input" id="searchInput" placeholder="Buscar funcionários...">
        <i class="fas fa-search search-icon"></i>
    </div>
    <select class="filter-control" id="filterStatus">
        <option value="todos">Todos os Status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
    </select>
    <button class="card-btn" onclick="exportarDados()">
        <i class="fas fa-file-export"></i> Exportar
    </button>
    <button class="card-btn" onclick="imprimirRelatorio()">
        <i class="fas fa-print"></i> Imprimir
    </button>
</div>
```

### 4. Tabelas Responsivas

```html
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody id="tableBody">
        <tr>
            <td data-label="ID">001</td>
            <td data-label="Nome">João Silva</td>
            <td data-label="Cargo">Gerente</td>
            <td data-label="Status">
                <span class="status-badge success">Ativo</span>
            </td>
            <td data-label="Ações">
                <div class="action-buttons">
                    <button class="action-btn" onclick="editItem(1)" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteItem(1)" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
```

**Status Badges Disponíveis:**
- `status-badge success` - Verde
- `status-badge warning` - Amarelo
- `status-badge danger` - Vermelho
- `status-badge info` - Azul

### 5. Modais de Formulário

```html
<div id="formModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="card-title" id="modalTitle">Novo Funcionário</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <form id="mainForm">
            <div class="form-grid">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="cargo">Cargo</label>
                    <select id="cargo" name="cargo" required>
                        <option value="">Selecione...</option>
                        <option value="gerente">Gerente</option>
                        <option value="vendedor">Vendedor</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="descricao">Observações</label>
                <textarea id="descricao" name="descricao" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="card-btn" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="header-btn primary" style="height: 48px;">Salvar</button>
            </div>
        </form>
    </div>
</div>
```

## 🔧 Funcionalidades JavaScript Disponíveis

### 1. Sistema de Notificações

```javascript
// Tipos: success, error, warning, info
showToast('success', 'Sucesso!', 'Funcionário criado com sucesso');
showToast('error', 'Erro!', 'Erro ao criar funcionário');
showToast('warning', 'Atenção!', 'Campos obrigatórios não preenchidos');
showToast('info', 'Informação', 'Processando dados...');
```

### 2. Sistema de Loading

```javascript
showLoading(); // Mostra overlay de loading
hideLoading(); // Esconde overlay de loading
```

### 3. Gerenciamento de Modal

```javascript
openModal(); // Abre modal para novo item
openModal(123); // Abre modal para editar item com ID 123
closeModal(); // Fecha modal
```

### 4. Funções de Exportação

```javascript
exportarDados(); // Exporta dados da tabela
imprimirRelatorio(); // Imprime relatório
```

## 🎨 Personalização de Cores

### Variáveis CSS Disponíveis

```css
:root {
    --primary-color: #8b5cf6;      /* Cor principal */
    --primary-dark: #7c3aed;       /* Cor principal escura */
    --secondary-color: #10b981;    /* Cor secundária */
    --accent-color: #f59e0b;       /* Cor de destaque */
    --danger-color: #ef4444;       /* Cor de perigo */
    --success-color: #22c55e;      /* Cor de sucesso */
    --warning-color: #f59e0b;      /* Cor de aviso */
    
    --bg-primary: #f9fafb;         /* Fundo principal */
    --bg-secondary: #ffffff;       /* Fundo secundário */
    --bg-card: #ffffff;            /* Fundo dos cards */
    --text-primary: #1f2937;       /* Texto principal */
    --text-secondary: #6b7280;     /* Texto secundário */
    --border-color: #e5e7eb;       /* Cor das bordas */
}
```

### Exemplo de Personalização

```css
/* Para uma tela específica, adicione no <style> */
:root {
    --primary-color: #3b82f6; /* Azul para tela de funcionários */
}

/* Ou para um componente específico */
.funcionarios-card {
    --primary-color: #10b981; /* Verde para cards de funcionários */
}
```

## 📱 Responsividade

O template é totalmente responsivo e inclui:

- **Desktop (>1024px)**: Sidebar sempre visível
- **Tablet (768px-1024px)**: Sidebar colapsável
- **Mobile (<768px)**: Layout adaptado, tabelas em cards

### Breakpoints CSS

```css
@media (min-width: 1024px) { 
    /* Desktop styles */
}

@media (max-width: 767px) { 
    /* Mobile styles */
}
```

## 🔄 Tema Claro/Escuro

O sistema de tema é automático e inclui:

- **Persistência**: Salva preferência no localStorage
- **Toggle**: Botão no header para alternar
- **Adaptação**: Todos os componentes se adaptam automaticamente

## 📋 Checklist para Nova Tela

- [ ] Copiar `template-padrao.html` para novo arquivo
- [ ] Alterar título da página
- [ ] Definir item ativo no sidebar
- [ ] Personalizar botão principal do header
- [ ] Criar cards de estatísticas específicos
- [ ] Definir estrutura da tabela principal
- [ ] Criar formulário do modal
- [ ] Implementar lógica JavaScript específica
- [ ] Testar responsividade
- [ ] Testar tema claro/escuro
- [ ] Validar funcionalidades (CRUD, exportação, etc.)

## 🎯 Exemplos de Implementação

### Tela de Funcionários
- Cards: Total de funcionários, ativos, inativos, turnover
- Tabela: Nome, cargo, departamento, status, ações
- Formulário: Dados pessoais, cargo, salário, etc.

### Tela de Fornecedores
- Cards: Total de fornecedores, ativos, avaliação média
- Tabela: Nome, categoria, contato, status, ações
- Formulário: Dados da empresa, contatos, produtos

### Tela de Vendas
- Cards: Vendas do dia, mês, ticket médio, conversão
- Tabela: Cliente, produtos, valor, status, data
- Formulário: Cliente, produtos, pagamento, etc.

## 🚀 Próximos Passos

1. **Implementar Primeira Tela**: Escolha uma tela da Fase 1
2. **Testar Template**: Valide todas as funcionalidades
3. **Criar Componentes Específicos**: Se necessário
4. **Integrar com Backend**: Conectar APIs REST
5. **Documentar Específicos**: Criar guias para cada tela

---

**Equipe de Desenvolvimento CorelSys ERP**  
*Template criado com base no design da tela financeiro.html* 