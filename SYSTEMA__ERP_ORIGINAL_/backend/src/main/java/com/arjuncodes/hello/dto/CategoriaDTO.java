package com.arjuncodes.hello.dto;

public class CategoriaDTO {
    
    private Long id;
    private String nome;
    private String descricao;
    private boolean ativo;
    private Integer quantidadeProdutos;
    
    // Construtores
    public CategoriaDTO() {}
    
    public CategoriaDTO(String nome) {
        this.nome = nome;
        this.ativo = true;
    }
    
    public CategoriaDTO(String nome, String descricao) {
        this(nome);
        this.descricao = descricao;
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
    
    public Integer getQuantidadeProdutos() {
        return quantidadeProdutos;
    }
    
    public void setQuantidadeProdutos(Integer quantidadeProdutos) {
        this.quantidadeProdutos = quantidadeProdutos;
    }
    
    @Override
    public String toString() {
        return "CategoriaDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", ativo=" + ativo +
                ", quantidadeProdutos=" + quantidadeProdutos +
                '}';
    }
} 