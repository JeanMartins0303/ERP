package com.arjuncodes.hello.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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
    
    @Column
    private String endereco;
    
    @Column
    private String bairro;
    
    @Column
    private String cidade;
    
    @Column
    private String estado;
    
    @Column
    private String cep;
    
    @Column(name = "data_nascimento")
    private LocalDateTime dataNascimento;
    
    @Column
    private String observacoes;
    
    // Construtores
    public Cliente() {
        this.dataCadastro = LocalDateTime.now();
    }
    
    public Cliente(String nome, String email) {
        this();
        this.nome = nome;
        this.email = email;
    }
    
    public Cliente(String nome, String email, String telefone) {
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
    
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
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
    
    public LocalDateTime getDataNascimento() {
        return dataNascimento;
    }
    
    public void setDataNascimento(LocalDateTime dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    
    public String getObservacoes() {
        return observacoes;
    }
    
    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
    
    // Métodos de negócio
    public String getEnderecoCompleto() {
        StringBuilder enderecoCompleto = new StringBuilder();
        if (endereco != null && !endereco.isEmpty()) {
            enderecoCompleto.append(endereco);
        }
        if (bairro != null && !bairro.isEmpty()) {
            if (enderecoCompleto.length() > 0) enderecoCompleto.append(", ");
            enderecoCompleto.append(bairro);
        }
        if (cidade != null && !cidade.isEmpty()) {
            if (enderecoCompleto.length() > 0) enderecoCompleto.append(", ");
            enderecoCompleto.append(cidade);
        }
        if (estado != null && !estado.isEmpty()) {
            if (enderecoCompleto.length() > 0) enderecoCompleto.append(" - ");
            enderecoCompleto.append(estado);
        }
        if (cep != null && !cep.isEmpty()) {
            if (enderecoCompleto.length() > 0) enderecoCompleto.append(" - CEP: ");
            enderecoCompleto.append(cep);
        }
        return enderecoCompleto.toString();
    }
    
    public boolean isPessoaFisica() {
        return cpfCnpj != null && cpfCnpj.length() <= 14;
    }
    
    public boolean isPessoaJuridica() {
        return cpfCnpj != null && cpfCnpj.length() > 14;
    }
    
    @Override
    public String toString() {
        return "Cliente{" +
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