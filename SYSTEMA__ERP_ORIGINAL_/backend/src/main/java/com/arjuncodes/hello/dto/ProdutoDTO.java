package com.arjuncodes.hello.dto;

import java.math.BigDecimal;

public class ProdutoDTO {
    
    private Long id;
    private String nome;
    private String codigoBarras;
    private Long categoriaId;
    private String categoriaNome;
    private BigDecimal precoCusto;
    private BigDecimal precoVenda;
    private String descricao;
    private boolean ativo;
    private Integer quantidadeEstoque;
    private Integer quantidadeMinima;
    private String unidadeMedida;
    
    // Construtores
    public ProdutoDTO() {}
    
    public ProdutoDTO(String nome, BigDecimal precoVenda) {
        this.nome = nome;
        this.precoVenda = precoVenda;
        this.ativo = true;
        this.quantidadeEstoque = 0;
        this.quantidadeMinima = 0;
        this.unidadeMedida = "UN";
    }
    
    public ProdutoDTO(String nome, String codigoBarras, BigDecimal precoVenda) {
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
    
    public Long getCategoriaId() {
        return categoriaId;
    }
    
    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
    
    public String getCategoriaNome() {
        return categoriaNome;
    }
    
    public void setCategoriaNome(String categoriaNome) {
        this.categoriaNome = categoriaNome;
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
    
    @Override
    public String toString() {
        return "ProdutoDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", codigoBarras='" + codigoBarras + '\'' +
                ", categoriaId=" + categoriaId +
                ", categoriaNome='" + categoriaNome + '\'' +
                ", precoCusto=" + precoCusto +
                ", precoVenda=" + precoVenda +
                ", ativo=" + ativo +
                ", quantidadeEstoque=" + quantidadeEstoque +
                '}';
    }
} 