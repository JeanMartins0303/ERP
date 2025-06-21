package com.arjuncodes.hello.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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
    
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    
    @OneToMany(mappedBy = "categoria")
    private List<Produto> produtos;
    
    // Construtores
    public Categoria() {
        this.dataCadastro = LocalDateTime.now();
    }
    
    public Categoria(String nome) {
        this();
        this.nome = nome;
    }
    
    public Categoria(String nome, String descricao) {
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
    
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    
    public List<Produto> getProdutos() {
        return produtos;
    }
    
    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
    
    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", ativo=" + ativo +
                ", dataCadastro=" + dataCadastro +
                '}';
    }
} 