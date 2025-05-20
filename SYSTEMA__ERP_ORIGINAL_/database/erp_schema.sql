-- Criação do banco ERP
CREATE DATABASE IF NOT EXISTS erp;
USE erp;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
); 

-- Tabela de produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    quantidade INT,
    preco DECIMAL(10,2)
);

-- Tabela de receitas e despesas (Financeiro)
CREATE TABLE financeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('RECEITA', 'DESPESA'),
    descricao VARCHAR(255),
    valor DECIMAL(10,2),
    data DATE
);


CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  quantidade INT,
  preco DECIMAL(10,2)
);

CREATE TABLE lancamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('ENTRADA', 'SAIDA') NOT NULL,
  descricao VARCHAR(255),
  valor DECIMAL(10, 2) NOT NULL,
  data DATE NOT NULL
);

CREATE TABLE financeiro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255),
    valor DOUBLE,
    tipo VARCHAR(20),
    data VARCHAR(20)
);


CREATE TABLE produtos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  quantidade INT NOT NULL,
  categoria VARCHAR(50),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cargo VARCHAR(50),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
