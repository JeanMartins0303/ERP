package com.arjuncodes.hello.repository;

import com.arjuncodes.hello.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    /**
     * Busca todos os clientes ativos
     */
    List<Cliente> findByAtivoTrue();
    
    /**
     * Busca cliente por email
     */
    Optional<Cliente> findByEmail(String email);
    
    /**
     * Busca cliente por CPF/CNPJ
     */
    Optional<Cliente> findByCpfCnpj(String cpfCnpj);
    
    /**
     * Busca cliente ativo por email
     */
    Optional<Cliente> findByAtivoTrueAndEmail(String email);
    
    /**
     * Busca cliente ativo por CPF/CNPJ
     */
    Optional<Cliente> findByAtivoTrueAndCpfCnpj(String cpfCnpj);
    
    /**
     * Busca clientes por nome contendo o texto
     */
    List<Cliente> findByNomeContainingIgnoreCase(String nome);
    
    /**
     * Busca clientes ativos por nome contendo o texto
     */
    List<Cliente> findByAtivoTrueAndNomeContainingIgnoreCase(String nome);
    
    /**
     * Busca clientes por cidade
     */
    List<Cliente> findByCidade(String cidade);
    
    /**
     * Busca clientes ativos por cidade
     */
    List<Cliente> findByAtivoTrueAndCidade(String cidade);
    
    /**
     * Busca clientes por estado
     */
    List<Cliente> findByEstado(String estado);
    
    /**
     * Busca clientes ativos por estado
     */
    List<Cliente> findByAtivoTrueAndEstado(String estado);
    
    /**
     * Busca clientes por telefone contendo o texto
     */
    List<Cliente> findByTelefoneContaining(String telefone);
    
    /**
     * Busca clientes ativos por telefone contendo o texto
     */
    List<Cliente> findByAtivoTrueAndTelefoneContaining(String telefone);
    
    /**
     * Busca clientes cadastrados em um período
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND c.dataCadastro BETWEEN :dataInicio AND :dataFim")
    List<Cliente> findClientesCadastradosNoPeriodo(@Param("dataInicio") LocalDateTime dataInicio, @Param("dataFim") LocalDateTime dataFim);
    
    /**
     * Conta clientes por cidade
     */
    @Query("SELECT c.cidade, COUNT(c) FROM Cliente c WHERE c.ativo = true GROUP BY c.cidade ORDER BY COUNT(c) DESC")
    List<Object[]> countClientesPorCidade();
    
    /**
     * Conta clientes por estado
     */
    @Query("SELECT c.estado, COUNT(c) FROM Cliente c WHERE c.ativo = true GROUP BY c.estado ORDER BY COUNT(c) DESC")
    List<Object[]> countClientesPorEstado();
    
    /**
     * Busca clientes sem telefone
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND (c.telefone IS NULL OR c.telefone = '')")
    List<Cliente> findClientesSemTelefone();
    
    /**
     * Busca clientes sem email
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND (c.email IS NULL OR c.email = '')")
    List<Cliente> findClientesSemEmail();
    
    /**
     * Busca clientes sem endereço
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND (c.endereco IS NULL OR c.endereco = '')")
    List<Cliente> findClientesSemEndereco();
    
    /**
     * Verifica se existe cliente com o email
     */
    boolean existsByEmail(String email);
    
    /**
     * Verifica se existe cliente ativo com o email
     */
    boolean existsByAtivoTrueAndEmail(String email);
    
    /**
     * Verifica se existe cliente com o CPF/CNPJ
     */
    boolean existsByCpfCnpj(String cpfCnpj);
    
    /**
     * Verifica se existe cliente ativo com o CPF/CNPJ
     */
    boolean existsByAtivoTrueAndCpfCnpj(String cpfCnpj);
    
    /**
     * Busca clientes pessoa física
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND LENGTH(c.cpfCnpj) <= 14")
    List<Cliente> findClientesPessoaFisica();
    
    /**
     * Busca clientes pessoa jurídica
     */
    @Query("SELECT c FROM Cliente c WHERE c.ativo = true AND LENGTH(c.cpfCnpj) > 14")
    List<Cliente> findClientesPessoaJuridica();
} 