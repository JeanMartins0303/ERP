@RestController
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String senha) {
        Usuario usuario = new Usuario(email, senha);
        UsuarioDAO dao = new UsuarioDAO();

        if (dao.autenticar(usuario)) {
            return ResponseEntity.ok("Login válido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }
}

@RestController
public class ProdutoController {

    @PostMapping("/produto")
    public ResponseEntity<String> cadastrar(
        @RequestParam String nome,
        @RequestParam int quantidade,
        @RequestParam double preco) {

        Produto produto = new Produto(nome, quantidade, preco);
        ProdutoDAO dao = new ProdutoDAO();
        dao.salvar(produto);

        return ResponseEntity.ok("Produto cadastrado com sucesso!");
    }

    @DeleteMapping("/produto/{id}")
    public ResponseEntity<?> excluir(@PathVariable int id) {
        ProdutoDAO dao = new ProdutoDAO();
        dao.excluir(id);
        return ResponseEntity.ok().build();
    }


}



