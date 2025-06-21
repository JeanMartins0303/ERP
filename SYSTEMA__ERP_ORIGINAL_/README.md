# Sistema ERP

## Estrutura do Projeto

- **frontend/**: Frontend do sistema, desenvolvido em HTML, CSS e JavaScript tradicional, com build moderno (Vite), lint, formatação e testes automatizados.
- **backend/**: Backend Spring Boot com Java 17, seguindo padrões RESTful e arquitetura limpa.

## Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript ES6+
- Vite (Build tool)
- Bootstrap 5.3.2
- Chart.js 4.4.0
- ESLint + Prettier
- Jest (Testes)

### Backend
- Spring Boot 3.4.5
- Java 17
- Spring Security
- Spring Data JPA
- H2 Database (desenvolvimento)
- Maven

## Estrutura do Backend

```
backend/src/main/java/com/arjuncodes/hello/
├── HelloApplication.java          # Classe principal do Spring Boot
├── config/
│   └── SecurityConfig.java        # Configurações de segurança
├── controller/
│   └── AuthController.java        # Controllers REST
├── dto/
│   └── LoginDTO.java              # Data Transfer Objects
├── model/
│   └── Usuario.java               # Entidades JPA
└── repository/
    └── UsuarioRepository.java     # Repositórios de dados
```

## Como Executar

### Backend
```bash
cd SYSTEMA__ERP_ORIGINAL_/backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd SYSTEMA__ERP_ORIGINAL_/frontend
npm install
npm run dev
```

## Limpeza Realizada

### ✅ Removido da Raiz:
- Removido frontend-react (experimental)
- Removido arquivos duplicados do backend
- Removido estrutura híbrida (DAO + Repository)
- Removido arquivos de IDE (.idea, .vscode duplicados)
- Removido node_modules da raiz
- Removido target/ (arquivos compilados)
- Atualizado .gitignore
- Criado HelloApplication.java principal

### ✅ Removido da Pasta SYSTEMA__ERP_ORIGINAL_:
- Removido `frontend/dist/` (arquivos de build)
- Removido `frontend/tests/` (testes duplicados)
- Removido `frontend/pages/` (página movida para raiz)
- Removido `frontend/css/components/examples/` (arquivos de exemplo)
- Removido `frontend/css/components/tests/` (testes duplicados)
- Movido `repository/` para estrutura correta do Spring Boot
- Corrigido packages e imports em todas as classes
- Criado entidade `Usuario.java` completa
- Atualizado `pom.xml` com dependências necessárias
- Configurado `application.properties` completo
- Removido `target/` (arquivos compilados)

## Funcionalidades do Sistema

### Módulos Principais:
- 🔐 **Autenticação** - Login, cadastro, recuperação de senha
- 📊 **Dashboard** - Painel principal com métricas
- 📦 **Produtos** - Gestão de produtos
- 📋 **Estoque** - Controle de estoque
- 💰 **Financeiro** - Gestão financeira
- 👥 **Clientes** - Cadastro de clientes
- 🛒 **PDV** - Ponto de Venda
- 🪑 **Mesas** - Gestão de mesas
- 📈 **Relatórios** - Análises e relatórios
- ⚙️ **Configurações** - Configurações do sistema
- 🤖 **Análise Preditiva** - IA e análises avançadas

## Banco de Dados

- **Desenvolvimento**: H2 Database (memória)
- **Console H2**: http://localhost:8080/h2-console
- **Credenciais**: sa/password

## Endpoints da API

- **POST** `/auth/login` - Autenticação de usuário
- **GET** `/h2-console` - Console do banco de dados

## Próximos Passos

1. Implementar demais entidades (Produto, Cliente, etc.)
2. Criar controllers para todos os módulos
3. Implementar validações e tratamento de erros
4. Configurar autenticação JWT
5. Implementar testes unitários e de integração
6. Configurar banco de dados de produção
