package model;

public class Produto {
    private int id;
    private String nome;
    private String descricao;
    private int quantidade;
    private double preco;

    public Produto(String nome, int quantidade, double preco) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    // Getters e Setters
    public int getId() {return id;}   
    public void setId(int id) {this.id = id;}

    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

    public String getDescricao() {return descricao;}
    public void setDescricao(String descricao) {this.descricao = descricao;}

    public int getQuantidade() {return quantidade;}
    public void setQuantidade(int quantidade) {this.quantidade = quantidade;}

    public double getPreco() {return preco;}
    public void setPreco(double preco) {this.preco = preco;}
    

    
public Produto buscarPorId(int id) {
    Produto produto = null;
    try {
        Connection con = Conexao.conectar();
        String sql = "SELECT * FROM produtos WHERE id = ?";
        PreparedStatement stmt = con.prepareStatement(sql);
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            produto = new Produto(
                rs.getString("nome"),
                rs.getInt("quantidade"),
                rs.getDouble("preco")
            );
            produto.setId(rs.getInt("id"));
        }

        con.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return produto;
}

    
}

