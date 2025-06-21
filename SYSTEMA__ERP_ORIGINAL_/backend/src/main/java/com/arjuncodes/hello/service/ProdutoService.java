package com.arjuncodes.hello.service;

import com.arjuncodes.hello.model.Produto;
import com.arjuncodes.hello.model.Categoria;
import com.arjuncodes.hello.repository.ProdutoRepository;
import com.arjuncodes.hello.repository.CategoriaRepository;
import com.arjuncodes.hello.dto.ProdutoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    /**
     * Lista todos os produtos ativos
     */
    public List<Produto> listarTodos() {
        return produtoRepository.findByAtivoTrue();
    }
    
    /**
     * Busca produto por ID
     */
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
    }
    
    /**
     * Busca produto por código de barras
     */
    public Optional<Produto> buscarPorCodigoBarras(String codigoBarras) {
        return produtoRepository.findByCodigoBarras(codigoBarras);
    }
    
    /**
     * Busca produtos por categoria
     */
    public List<Produto> buscarPorCategoria(Long categoriaId) {
        return produtoRepository.findByAtivoTrueAndCategoriaId(categoriaId);
    }
    
    /**
     * Busca produtos por nome
     */
    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByAtivoTrueAndNomeContainingIgnoreCase(nome);
    }
    
    /**
     * Busca produtos com estoque baixo
     */
    public List<Produto> buscarComEstoqueBaixo() {
        return produtoRepository.findProdutosComEstoqueBaixo();
    }
    
    /**
     * Busca produtos sem estoque
     */
    public List<Produto> buscarSemEstoque() {
        return produtoRepository.findProdutosSemEstoque();
    }
    
    /**
     * Busca produtos com estoque
     */
    public List<Produto> buscarComEstoque() {
        return produtoRepository.findProdutosComEstoque();
    }
    
    /**
     * Busca produtos por faixa de preço
     */
    public List<Produto> buscarPorFaixaPreco(BigDecimal precoMin, BigDecimal precoMax) {
        return produtoRepository.findProdutosPorFaixaPreco(precoMin, precoMax);
    }
    
    /**
     * Salva um produto
     */
    public Produto salvar(Produto produto) {
        validarProduto(produto);
        
        if (produto.getId() == null) {
            produto.setDataCadastro(LocalDateTime.now());
        }
        
        return produtoRepository.save(produto);
    }
    
    /**
     * Salva um produto a partir de DTO
     */
    public Produto salvar(ProdutoDTO produtoDTO) {
        Produto produto = converterDTO(produtoDTO);
        return salvar(produto);
    }
    
    /**
     * Atualiza um produto
     */
    public Produto atualizar(Long id, ProdutoDTO produtoDTO) {
        Produto produto = buscarPorId(id);
        atualizarProduto(produto, produtoDTO);
        return produtoRepository.save(produto);
    }
    
    /**
     * Deleta um produto (soft delete)
     */
    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        produto.setAtivo(false);
        produtoRepository.save(produto);
    }
    
    /**
     * Atualiza estoque de um produto
     */
    public Produto atualizarEstoque(Long id, Integer quantidade) {
        Produto produto = buscarPorId(id);
        produto.setQuantidadeEstoque(quantidade);
        return produtoRepository.save(produto);
    }
    
    /**
     * Adiciona quantidade ao estoque
     */
    public Produto adicionarEstoque(Long id, Integer quantidade) {
        Produto produto = buscarPorId(id);
        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() + quantidade);
        return produtoRepository.save(produto);
    }
    
    /**
     * Remove quantidade do estoque
     */
    public Produto removerEstoque(Long id, Integer quantidade) {
        Produto produto = buscarPorId(id);
        if (produto.getQuantidadeEstoque() < quantidade) {
            throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
        }
        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);
        return produtoRepository.save(produto);
    }
    
    /**
     * Calcula valor total em estoque
     */
    public BigDecimal calcularValorTotalEstoque() {
        BigDecimal valor = produtoRepository.calcularValorTotalEstoque();
        return valor != null ? valor : BigDecimal.ZERO;
    }
    
    /**
     * Valida dados do produto
     */
    private void validarProduto(Produto produto) {
        if (produto.getNome() == null || produto.getNome().trim().isEmpty()) {
            throw new RuntimeException("Nome do produto é obrigatório");
        }
        
        if (produto.getPrecoVenda() == null || produto.getPrecoVenda().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Preço de venda deve ser maior ou igual a zero");
        }
        
        if (produto.getCodigoBarras() != null && !produto.getCodigoBarras().trim().isEmpty()) {
            Optional<Produto> produtoExistente = produtoRepository.findByCodigoBarras(produto.getCodigoBarras());
            if (produtoExistente.isPresent() && !produtoExistente.get().getId().equals(produto.getId())) {
                throw new RuntimeException("Código de barras já existe: " + produto.getCodigoBarras());
            }
        }
    }
    
    /**
     * Converte DTO para entidade
     */
    private Produto converterDTO(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setId(produtoDTO.getId());
        produto.setNome(produtoDTO.getNome());
        produto.setCodigoBarras(produtoDTO.getCodigoBarras());
        produto.setPrecoCusto(produtoDTO.getPrecoCusto());
        produto.setPrecoVenda(produtoDTO.getPrecoVenda());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setAtivo(produtoDTO.isAtivo());
        produto.setQuantidadeEstoque(produtoDTO.getQuantidadeEstoque());
        produto.setQuantidadeMinima(produtoDTO.getQuantidadeMinima());
        produto.setUnidadeMedida(produtoDTO.getUnidadeMedida());
        
        if (produtoDTO.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
            produto.setCategoria(categoria);
        }
        
        return produto;
    }
    
    /**
     * Atualiza produto com dados do DTO
     */
    private void atualizarProduto(Produto produto, ProdutoDTO produtoDTO) {
        produto.setNome(produtoDTO.getNome());
        produto.setCodigoBarras(produtoDTO.getCodigoBarras());
        produto.setPrecoCusto(produtoDTO.getPrecoCusto());
        produto.setPrecoVenda(produtoDTO.getPrecoVenda());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setAtivo(produtoDTO.isAtivo());
        produto.setQuantidadeEstoque(produtoDTO.getQuantidadeEstoque());
        produto.setQuantidadeMinima(produtoDTO.getQuantidadeMinima());
        produto.setUnidadeMedida(produtoDTO.getUnidadeMedida());
        
        if (produtoDTO.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
            produto.setCategoria(categoria);
        }
    }
} 