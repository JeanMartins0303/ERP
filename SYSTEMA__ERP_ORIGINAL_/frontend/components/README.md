# Estrutura de Componentes do Sistema ERP

## Organização de Pastas

```
components/
├── common/           # Componentes comuns reutilizáveis
│   ├── buttons/     # Botões e controles
│   ├── forms/       # Campos de formulário
│   ├── layout/      # Elementos de layout
│   └── feedback/    # Notificações e mensagens
├── modules/         # Componentes específicos por módulo
│   ├── financeiro/
│   ├── estoque/
│   ├── clientes/
│   └── produtos/
└── shared/          # Componentes compartilhados entre módulos
    ├── header/
    ├── sidebar/
    └── footer/
```

## Padrões de Nomenclatura

- Arquivos de componentes: `PascalCase.js`
- Arquivos de estilo: `kebab-case.css`
- Arquivos de teste: `component-name.test.js`

## Convenções

1. Cada componente deve ter:
   - Arquivo principal do componente
   - Arquivo de estilos
   - Arquivo de testes
   - Documentação básica

2. Estrutura básica de um componente:
```javascript
// ComponentName.js
export class ComponentName {
    constructor() {
        // Inicialização
    }

    // Métodos públicos
    // Eventos
    // Renderização
}
```

## Estilos

- Usar CSS Modules ou BEM para nomenclatura
- Manter consistência com o sistema de design
- Seguir as variáveis de tema definidas

## Testes

- Testes unitários para cada componente
- Testes de integração para fluxos principais
- Cobertura mínima de 80% 