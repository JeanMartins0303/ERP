package com.arjuncodes.hello.controller;

import com.arjuncodes.hello.model.Produto;
import com.arjuncodes.hello.service.ProdutoService;
import com.arjuncodes.hello.dto.ProdutoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;
    
    /**
     * Lista todos os produtos ativos
     */
    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        List<Produto> produtos = produtoService.listarTodos();
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produto por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        try {
            Produto produto = produtoService.buscarPorId(id);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Busca produto por código de barras
     */
    @GetMapping("/codigo/{codigoBarras}")
    public ResponseEntity<Produto> buscarPorCodigoBarras(@PathVariable String codigoBarras) {
        Optional<Produto> produto = produtoService.buscarPorCodigoBarras(codigoBarras);
        return produto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Busca produtos por categoria
     */
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Produto>> buscarPorCategoria(@PathVariable Long categoriaId) {
        List<Produto> produtos = produtoService.buscarPorCategoria(categoriaId);
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produtos por nome
     */
    @GetMapping("/busca")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam String nome) {
        List<Produto> produtos = produtoService.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produtos com estoque baixo
     */
    @GetMapping("/estoque-baixo")
    public ResponseEntity<List<Produto>> buscarComEstoqueBaixo() {
        List<Produto> produtos = produtoService.buscarComEstoqueBaixo();
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produtos sem estoque
     */
    @GetMapping("/sem-estoque")
    public ResponseEntity<List<Produto>> buscarSemEstoque() {
        List<Produto> produtos = produtoService.buscarSemEstoque();
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produtos com estoque
     */
    @GetMapping("/com-estoque")
    public ResponseEntity<List<Produto>> buscarComEstoque() {
        List<Produto> produtos = produtoService.buscarComEstoque();
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Busca produtos por faixa de preço
     */
    @GetMapping("/faixa-preco")
    public ResponseEntity<List<Produto>> buscarPorFaixaPreco(
            @RequestParam BigDecimal precoMin,
            @RequestParam BigDecimal precoMax) {
        List<Produto> produtos = produtoService.buscarPorFaixaPreco(precoMin, precoMax);
        return ResponseEntity.ok(produtos);
    }
    
    /**
     * Cria um novo produto
     */
    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody ProdutoDTO produtoDTO) {
        try {
            Produto produto = produtoService.salvar(produtoDTO);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Atualiza um produto existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {
        try {
            Produto produto = produtoService.atualizar(id, produtoDTO);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Deleta um produto (soft delete)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            produtoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Atualiza estoque de um produto
     */
    @PutMapping("/{id}/estoque")
    public ResponseEntity<Produto> atualizarEstoque(
            @PathVariable Long id,
            @RequestParam Integer quantidade) {
        try {
            Produto produto = produtoService.atualizarEstoque(id, quantidade);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Adiciona quantidade ao estoque
     */
    @PutMapping("/{id}/adicionar-estoque")
    public ResponseEntity<Produto> adicionarEstoque(
            @PathVariable Long id,
            @RequestParam Integer quantidade) {
        try {
            Produto produto = produtoService.adicionarEstoque(id, quantidade);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Remove quantidade do estoque
     */
    @PutMapping("/{id}/remover-estoque")
    public ResponseEntity<Produto> removerEstoque(
            @PathVariable Long id,
            @RequestParam Integer quantidade) {
        try {
            Produto produto = produtoService.removerEstoque(id, quantidade);
            return ResponseEntity.ok(produto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Calcula valor total em estoque
     */
    @GetMapping("/valor-total-estoque")
    public ResponseEntity<BigDecimal> calcularValorTotalEstoque() {
        BigDecimal valor = produtoService.calcularValorTotalEstoque();
        return ResponseEntity.ok(valor);
    }
} 