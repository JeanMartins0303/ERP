package com.seusistema.dao;

import com.seusistema.model.Produto;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ProdutoDAO {
    private final DataSource dataSource;

    @Autowired
    public ProdutoDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void adicionar(Produto produto) throws SQLException {
    String sql = "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)";
    try (Connection connection = dataSource.getConnection();
         PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setString(1, produto.getNome());
        stmt.setString(2, produto.getDescricao());
        stmt.setDouble(3, produto.getPreco());
        stmt.setInt(4, produto.getQuantidade());
        stmt.executeUpdate();
    }
}

    public void atualizar(Produto produto) throws SQLException {
        String sql = "UPDATE produtos SET nome=?, descricao=?, preco=?, quantidade=? WHERE id=?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, produto.getNome());
            stmt.setString(2, produto.getDescricao());
            stmt.setDouble(3, produto.getPreco());
            stmt.setInt(4, produto.getQuantidade());
            stmt.setInt(5, produto.getId());
            stmt.executeUpdate();
        }
    }

    public void excluir(int id) throws SQLException {
        String sql = "DELETE FROM produtos WHERE id=?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    public Produto buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM produtos WHERE id=?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Produto p = new Produto();
                p.setId(rs.getInt("id"));
                p.setNome(rs.getString("nome"));
                p.setDescricao(rs.getString("descricao"));
                p.setPreco(rs.getDouble("preco"));
                p.setQuantidade(rs.getInt("quantidade"));
                return p;
            }
        }
        return null;
    }

    public List<Produto> listarTodos() throws SQLException {
        List<Produto> produtos = new ArrayList<>();
        String sql = "SELECT * FROM produtos";
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Produto p = new Produto();
                p.setId(rs.getInt("id"));
                p.setNome(rs.getString("nome"));
                p.setDescricao(rs.getString("descricao"));
                p.setPreco(rs.getDouble("preco"));
                p.setQuantidade(rs.getInt("quantidade"));
                produtos.add(p);
            }
        }
        return produtos;
    }
}

