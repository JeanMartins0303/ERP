package com.arjuncodes.hello.repository;

import com.arjuncodes.hello.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    /**
     * Busca todos os produtos ativos
     */
    List<Produto> findByAtivoTrue();
    
    /**
     * Busca produto por código de barras
     */
    Optional<Produto> findByCodigoBarras(String codigoBarras);
    
    /**
     * Busca produtos por categoria
     */
    List<Produto> findByCategoriaId(Long categoriaId);
    
    /**
     * Busca produtos ativos por categoria
     */
    List<Produto> findByAtivoTrueAndCategoriaId(Long categoriaId);
    
    /**
     * Busca produtos por nome contendo o texto
     */
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    
    /**
     * Busca produtos ativos por nome contendo o texto
     */
    List<Produto> findByAtivoTrueAndNomeContainingIgnoreCase(String nome);
    
    /**
     * Busca produtos com estoque baixo
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND p.quantidadeEstoque <= p.quantidadeMinima")
    List<Produto> findProdutosComEstoqueBaixo();
    
    /**
     * Busca produtos sem estoque
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND p.quantidadeEstoque = 0")
    List<Produto> findProdutosSemEstoque();
    
    /**
     * Busca produtos com estoque
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND p.quantidadeEstoque > 0")
    List<Produto> findProdutosComEstoque();
    
    /**
     * Busca produtos por faixa de preço
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND p.precoVenda BETWEEN :precoMin AND :precoMax")
    List<Produto> findProdutosPorFaixaPreco(@Param("precoMin") BigDecimal precoMin, @Param("precoMax") BigDecimal precoMax);
    
    /**
     * Busca produtos mais caros
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true ORDER BY p.precoVenda DESC")
    List<Produto> findProdutosMaisCaros();
    
    /**
     * Busca produtos mais baratos
     */
    @Query("SELECT p FROM Produto p WHERE p.ativo = true ORDER BY p.precoVenda ASC")
    List<Produto> findProdutosMaisBaratos();
    
    /**
     * Conta produtos por categoria
     */
    @Query("SELECT p.categoria.nome, COUNT(p) FROM Produto p WHERE p.ativo = true GROUP BY p.categoria.id, p.categoria.nome")
    List<Object[]> countProdutosPorCategoria();
    
    /**
     * Calcula valor total em estoque
     */
    @Query("SELECT SUM(p.precoCusto * p.quantidadeEstoque) FROM Produto p WHERE p.ativo = true AND p.precoCusto IS NOT NULL")
    BigDecimal calcularValorTotalEstoque();
    
    /**
     * Verifica se existe produto com o código de barras
     */
    boolean existsByCodigoBarras(String codigoBarras);
    
    /**
     * Verifica se existe produto ativo com o código de barras
     */
    boolean existsByAtivoTrueAndCodigoBarras(String codigoBarras);
    
    /**
     * Busca produtos por unidade de medida
     */
    List<Produto> findByUnidadeMedida(String unidadeMedida);
    
    /**
     * Busca produtos ativos por unidade de medida
     */
    List<Produto> findByAtivoTrueAndUnidadeMedida(String unidadeMedida);
} 