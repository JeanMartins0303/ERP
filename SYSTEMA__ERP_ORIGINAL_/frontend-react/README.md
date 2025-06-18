# Sistema ERP - Frontend

Este é o frontend do Sistema ERP, desenvolvido com React, TypeScript e Material-UI.

## 🚀 Tecnologias

- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Formik + Yup
- Axios

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências
```bash
cd frontend-react
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   ├── auth/      # Componentes de autenticação
│   ├── layout/    # Componentes de layout
│   └── ui/        # Componentes de interface
├── pages/         # Páginas da aplicação
├── store/         # Configuração do Redux
│   └── slices/    # Redux slices
├── services/      # Serviços e APIs
├── utils/         # Funções utilitárias
├── hooks/         # Custom hooks
├── types/         # Definições de tipos
└── assets/        # Recursos estáticos
```

## 🎨 Design System

O projeto utiliza o Material-UI como base para o design system, com customizações específicas:

- Cores primárias e secundárias
- Tipografia personalizada
- Componentes customizados
- Temas claro e escuro

## 🔐 Autenticação

O sistema utiliza JWT para autenticação:

- Login/Logout
- Proteção de rotas
- Refresh token
- Persistência de sessão

## 📱 Responsividade

O frontend é totalmente responsivo:

- Mobile-first
- Breakpoints definidos
- Layouts adaptáveis
- Componentes responsivos

## 🧪 Testes

O projeto inclui:

- Testes unitários com Jest
- Testes de integração
- Testes E2E com Cypress
- Cobertura de código

## 📦 Build

Para criar uma build de produção:

```bash
npm run build
```

## 🔄 CI/CD

O projeto utiliza:

- GitHub Actions
- Deploy automático
- Linting
- Type checking

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para [EMAIL] ou abra uma issue no GitHub. 