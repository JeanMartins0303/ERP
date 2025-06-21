# 🚀 PLANO DE AÇÃO - IMPLEMENTAÇÃO ERP

## 📋 **PRIORIZAÇÃO DE MÓDULOS**

### **🔥 PRIORIDADE MÁXIMA (Semana 1-2)**

#### **1. Entidades Core do Backend**
- [ ] **Produto** - Base para vendas e estoque
- [ ] **Categoria** - Organização de produtos
- [ ] **Cliente** - Gestão de clientes
- [ ] **Venda** - Registro de vendas
- [ ] **ItemVenda** - Itens de cada venda

#### **2. Controllers Essenciais**
- [ ] **ProdutoController** - CRUD completo
- [ ] **ClienteController** - CRUD completo
- [ ] **VendaController** - Registro de vendas
- [ ] **EstoqueController** - Controle de estoque

#### **3. Melhorias no Frontend**
- [ ] **Dashboard funcional** - Métricas reais
- [ ] **PDV operacional** - Interface de vendas
- [ ] **Gestão de produtos** - CRUD completo
- [ ] **Gestão de clientes** - CRUD completo

---

### **⚡ PRIORIDADE ALTA (Semana 3-4)**

#### **1. Módulos de Negócio**
- [ ] **Estoque completo** - Entrada, saída, alertas
- [ ] **Relatórios básicos** - Vendas, produtos, clientes
- [ ] **Configurações** - Dados da empresa, usuários

#### **2. Funcionalidades Avançadas**
- [ ] **Código de barras** - Leitura e geração
- [ ] **Impressão** - Comprovantes de venda
- [ ] **Backup** - Sistema de backup automático

---

### **📈 PRIORIDADE MÉDIA (Semana 5-8)**

#### **1. Módulos Financeiros**
- [ ] **Contas a pagar/receber**
- [ ] **Fluxo de caixa**
- [ ] **Relatórios financeiros**

#### **2. Gestão de Pessoas**
- [ ] **Funcionários** - Cadastro e controle
- [ ] **Fornecedores** - Gestão de fornecedores
- [ ] **Permissões** - Controle de acesso

---

### **🎯 PRIORIDADE BAIXA (Semana 9-12)**

#### **1. Funcionalidades Avançadas**
- [ ] **Analytics** - Análises preditivas
- [ ] **Integrações** - APIs externas
- [ ] **Mobile** - Aplicativo mobile

---

## 🛠️ **IMPLEMENTAÇÃO DETALHADA - SEMANA 1**

### **DIA 1-2: Estrutura do Backend**

#### **1. Criar Entidade Produto**
```java
@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(unique = true)
    private String codigoBarras;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal precoCusto;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal precoVenda;
    
    @Column
    private String descricao;
    
    @Column
    private boolean ativo = true;
    
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    
    // Getters, setters, construtores
}
```

#### **2. Criar Entidade Categoria**
```java
@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column
    private String descricao;
    
    @Column
    private boolean ativo = true;
    
    @OneToMany(mappedBy = "categoria")
    private List<Produto> produtos;
    
    // Getters, setters, construtores
}
```

#### **3. Criar Entidade Cliente**
```java
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(unique = true)
    private String email;
    
    @Column
    private String telefone;
    
    @Column(unique = true)
    private String cpfCnpj;
    
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    
    @Column
    private boolean ativo = true;
    
    // Getters, setters, construtores
}
```

### **DIA 3-4: Repositórios e Services**

#### **1. Criar Repositórios**
```java
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByAtivoTrue();
    Optional<Produto> findByCodigoBarras(String codigoBarras);
    List<Produto> findByCategoriaId(Long categoriaId);
}

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByAtivoTrue();
}

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findByCpfCnpj(String cpfCnpj);
    List<Cliente> findByAtivoTrue();
}
```

#### **2. Criar Services**
```java
@Service
@Transactional
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    public List<Produto> listarTodos() {
        return produtoRepository.findByAtivoTrue();
    }
    
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }
    
    public Produto salvar(Produto produto) {
        if (produto.getId() == null) {
            produto.setDataCadastro(LocalDateTime.now());
        }
        return produtoRepository.save(produto);
    }
    
    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        produto.setAtivo(false);
        produtoRepository.save(produto);
    }
}
```

### **DIA 5-7: Controllers e DTOs**

#### **1. Criar DTOs**
```java
public class ProdutoDTO {
    private Long id;
    private String nome;
    private String codigoBarras;
    private Long categoriaId;
    private BigDecimal precoCusto;
    private BigDecimal precoVenda;
    private String descricao;
    private boolean ativo;
    
    // Getters, setters
}

public class CategoriaDTO {
    private Long id;
    private String nome;
    private String descricao;
    private boolean ativo;
    
    // Getters, setters
}

public class ClienteDTO {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cpfCnpj;
    private boolean ativo;
    
    // Getters, setters
}
```

#### **2. Criar Controllers**
```java
@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;
    
    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }
    
    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody ProdutoDTO produtoDTO) {
        Produto produto = converterDTO(produtoDTO);
        return ResponseEntity.ok(produtoService.salvar(produto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {
        Produto produto = produtoService.buscarPorId(id);
        atualizarProduto(produto, produtoDTO);
        return ResponseEntity.ok(produtoService.salvar(produto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 🎨 **IMPLEMENTAÇÃO FRONTEND - SEMANA 1**

### **DIA 1-2: Melhorar Dashboard**

#### **1. Dashboard com Dados Reais**
- [ ] Conectar com API de produtos
- [ ] Mostrar total de produtos cadastrados
- [ ] Mostrar total de clientes
- [ ] Gráfico de produtos por categoria
- [ ] Lista de produtos mais vendidos

#### **2. Melhorar Gestão de Produtos**
- [ ] Formulário de cadastro completo
- [ ] Listagem com paginação
- [ ] Busca por nome/código
- [ ] Edição inline
- [ ] Upload de imagens

### **DIA 3-4: PDV Funcional**

#### **1. Interface de Vendas**
- [ ] Busca de produtos por código/nome
- [ ] Adição de itens ao carrinho
- [ ] Cálculo automático de totais
- [ ] Seleção de cliente
- [ ] Formas de pagamento

#### **2. Finalização de Venda**
- [ ] Confirmação de dados
- [ ] Geração de comprovante
- [ ] Atualização de estoque
- [ ] Registro no banco

### **DIA 5-7: Gestão de Clientes**

#### **1. CRUD Completo**
- [ ] Formulário de cadastro
- [ ] Listagem com filtros
- [ ] Edição de dados
- [ ] Histórico de compras
- [ ] Exportação de dados

---

## 📊 **MÉTRICAS DE PROGRESSO**

### **Backend (Semana 1)**
- [ ] 5 entidades criadas
- [ ] 5 repositórios implementados
- [ ] 5 services funcionais
- [ ] 5 controllers com CRUD
- [ ] Validações básicas
- [ ] Tratamento de erros

### **Frontend (Semana 1)**
- [ ] Dashboard conectado à API
- [ ] CRUD de produtos funcional
- [ ] CRUD de clientes funcional
- [ ] PDV básico operacional
- [ ] Interface responsiva
- [ ] Validações de formulário

### **Integração (Semana 1)**
- [ ] CORS configurado
- [ ] Autenticação funcionando
- [ ] Dados persistindo
- [ ] Relatórios básicos
- [ ] Testes manuais

---

## 🎯 **ENTREGÁVEIS DA SEMANA 1**

### **Backend**
1. ✅ Entidades: Produto, Categoria, Cliente
2. ✅ Repositórios com queries customizadas
3. ✅ Services com lógica de negócio
4. ✅ Controllers REST completos
5. ✅ DTOs para transferência de dados
6. ✅ Validações e tratamento de erros

### **Frontend**
1. ✅ Dashboard com dados reais
2. ✅ Gestão completa de produtos
3. ✅ Gestão completa de clientes
4. ✅ PDV básico funcional
5. ✅ Interface responsiva e moderna

### **Documentação**
1. ✅ API documentada
2. ✅ Guia de uso
3. ✅ Arquitetura atualizada
4. ✅ Próximos passos definidos

---

## 🚀 **PRÓXIMOS PASSOS APÓS SEMANA 1**

### **Semana 2: Estoque e Vendas**
- [ ] Entidade Estoque e MovimentacaoEstoque
- [ ] Controle de entrada/saída
- [ ] Alertas de estoque mínimo
- [ ] Sistema de vendas completo
- [ ] Relatórios de vendas

### **Semana 3: Financeiro**
- [ ] Contas a pagar/receber
- [ ] Fluxo de caixa
- [ ] Relatórios financeiros
- [ ] Integração com PDV

### **Semana 4: Otimizações**
- [ ] Performance
- [ ] Segurança
- [ ] Testes automatizados
- [ ] Deploy

---

*Este plano garante que tenhamos um sistema funcional e escalável em 4 semanas, com foco nas funcionalidades mais críticas para o negócio.* 