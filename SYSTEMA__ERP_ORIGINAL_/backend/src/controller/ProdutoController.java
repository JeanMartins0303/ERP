package com.seusistema.controller;

import com.seusistema.dao.ProdutoDAO;
import com.seusistema.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private ProdutoDAO produtoDAO;

    @Autowired
    public ProdutoController(DataSource dataSource) throws SQLException {
        Connection conn = dataSource.getConnection();
        this.produtoDAO = new ProdutoDAO(conn);
    }

    @GetMapping
    public List<Produto> listar() throws SQLException {
        return produtoDAO.listarTodos();
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable int id) throws SQLException {
        return produtoDAO.buscarPorId(id);
    }

    @PostMapping
    public void adicionar(@RequestBody Produto produto) throws SQLException {
        produtoDAO.adicionar(produto);
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable int id, @RequestBody Produto produto) throws SQLException {
        produto.setId(id);
        produtoDAO.atualizar(produto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) throws SQLException {
        produtoDAO.excluir(id);
    }
}
