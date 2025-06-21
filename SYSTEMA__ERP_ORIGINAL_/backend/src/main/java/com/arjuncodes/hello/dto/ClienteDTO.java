package com.arjuncodes.hello.dto;

public class ClienteDTO {
    
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cpfCnpj;
    private boolean ativo;
    private String endereco;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;
    private String observacoes;
    
    // Construtores
    public ClienteDTO() {}
    
    public ClienteDTO(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.ativo = true;
    }
    
    public ClienteDTO(String nome, String email, String telefone) {
        this(nome, email);
        this.telefone = telefone;
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
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getTelefone() {
        return telefone;
    }
    
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    
    public String getCpfCnpj() {
        return cpfCnpj;
    }
    
    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }
    
    public boolean isAtivo() {
        return ativo;
    }
    
    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
    
    public String getEndereco() {
        return endereco;
    }
    
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    
    public String getBairro() {
        return bairro;
    }
    
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
    
    public String getCidade() {
        return cidade;
    }
    
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getCep() {
        return cep;
    }
    
    public void setCep(String cep) {
        this.cep = cep;
    }
    
    public String getObservacoes() {
        return observacoes;
    }
    
    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
    
    @Override
    public String toString() {
        return "ClienteDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", telefone='" + telefone + '\'' +
                ", cpfCnpj='" + cpfCnpj + '\'' +
                ", ativo=" + ativo +
                ", cidade='" + cidade + '\'' +
                '}';
    }
} 