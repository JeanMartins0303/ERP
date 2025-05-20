package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Financeiro;
import util.Conexao;

public class FinanceiroDAO {

    public void inserir(Financeiro f) {
        try {
            Connection con = Conexao.conectar();
            String sql = "INSERT INTO financeiro (descricao, valor, tipo, data) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, f.getDescricao());
            stmt.setDouble(2, f.getValor());
            stmt.setString(3, f.getTipo());
            stmt.setString(4, f.getData());
            stmt.executeUpdate();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Financeiro> listar() {
        List<Financeiro> lista = new ArrayList<>();
        try {
            Connection con = Conexao.conectar();
            String sql = "SELECT * FROM financeiro ORDER BY data DESC";
            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Financeiro f = new Financeiro();
                f.setId(rs.getInt("id"));
                f.setDescricao(rs.getString("descricao"));
                f.setValor(rs.getDouble("valor"));
                f.setTipo(rs.getString("tipo"));
                f.setData(rs.getString("data"));
                lista.add(f);
            }

            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }

    public void excluir(int id) {
        try {
            Connection con = Conexao.conectar();
            String sql = "DELETE FROM financeiro WHERE id = ?";
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setInt(1, id);
            stmt.executeUpdate();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
