package com.arjuncodes.hello.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    
    @Column(name = "quantidade_estoque")
    private Integer quantidadeEstoque = 0;
    
    @Column(name = "quantidade_minima")
    private Integer quantidadeMinima = 0;
    
    @Column(name = "unidade_medida")
    private String unidadeMedida = "UN";
    
    // Construtores
    public Produto() {
        this.dataCadastro = LocalDateTime.now();
        this.precoVenda = BigDecimal.ZERO;
        this.precoCusto = BigDecimal.ZERO;
    }
    
    public Produto(String nome, BigDecimal precoVenda) {
        this();
        this.nome = nome;
        this.precoVenda = precoVenda;
    }
    
    public Produto(String nome, String codigoBarras, BigDecimal precoVenda) {
        this(nome, precoVenda);
        this.codigoBarras = codigoBarras;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getCodigoBarras() {
        return codigoBarras;
    }
    
    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
    public BigDecimal getPrecoCusto() {
        return precoCusto;
    }
    
    public void setPrecoCusto(BigDecimal precoCusto) {
        this.precoCusto = precoCusto;
    }
    
    public BigDecimal getPrecoVenda() {
        return precoVenda;
    }
    
    public void setPrecoVenda(BigDecimal precoVenda) {
        this.precoVenda = precoVenda;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public boolean isAtivo() {
        return ativo;
    }
    
    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
    
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    
    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }
    
    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }
    
    public Integer getQuantidadeMinima() {
        return quantidadeMinima;
    }
    
    public void setQuantidadeMinima(Integer quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }
    
    public String getUnidadeMedida() {
        return unidadeMedida;
    }
    
    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }
    
    // Métodos de negócio
    public boolean temEstoqueSuficiente(Integer quantidade) {
        return this.quantidadeEstoque >= quantidade;
    }
    
    public boolean precisaReposicao() {
        return this.quantidadeEstoque <= this.quantidadeMinima;
    }
    
    public BigDecimal calcularMargem() {
        if (precoCusto != null && precoCusto.compareTo(BigDecimal.ZERO) > 0) {
            return precoVenda.subtract(precoCusto);
        }
        return BigDecimal.ZERO;
    }
    
    public BigDecimal calcularMargemPercentual() {
        if (precoCusto != null && precoCusto.compareTo(BigDecimal.ZERO) > 0) {
            return precoVenda.subtract(precoCusto)
                    .divide(precoCusto, 4, BigDecimal.ROUND_HALF_UP)
                    .multiply(new BigDecimal("100"));
        }
        return BigDecimal.ZERO;
    }
    
    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", codigoBarras='" + codigoBarras + '\'' +
                ", categoria=" + (categoria != null ? categoria.getNome() : "null") +
                ", precoCusto=" + precoCusto +
                ", precoVenda=" + precoVenda +
                ", ativo=" + ativo +
                ", quantidadeEstoque=" + quantidadeEstoque +
                '}';
    }
} 