package com.arjuncodes.hello.repository;

import com.arjuncodes.hello.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    /**
     * Busca todas as categorias ativas
     */
    List<Categoria> findByAtivoTrue();
    
    /**
     * Busca categoria por nome
     */
    Optional<Categoria> findByNome(String nome);
    
    /**
     * Busca categorias por nome contendo o texto
     */
    List<Categoria> findByNomeContainingIgnoreCase(String nome);
    
    /**
     * Busca categorias ativas por nome contendo o texto
     */
    List<Categoria> findByAtivoTrueAndNomeContainingIgnoreCase(String nome);
    
    /**
     * Verifica se existe categoria com o nome
     */
    boolean existsByNome(String nome);
    
    /**
     * Verifica se existe categoria ativa com o nome
     */
    boolean existsByAtivoTrueAndNome(String nome);
    
    /**
     * Conta quantos produtos tem em cada categoria
     */
    @Query("SELECT c.nome, COUNT(p) FROM Categoria c LEFT JOIN c.produtos p WHERE c.ativo = true GROUP BY c.id, c.nome")
    List<Object[]> countProdutosPorCategoria();
    
    /**
     * Busca categorias com produtos
     */
    @Query("SELECT c FROM Categoria c WHERE c.ativo = true AND SIZE(c.produtos) > 0")
    List<Categoria> findCategoriasComProdutos();
    
    /**
     * Busca categorias sem produtos
     */
    @Query("SELECT c FROM Categoria c WHERE c.ativo = true AND SIZE(c.produtos) = 0")
    List<Categoria> findCategoriasSemProdutos();
} 