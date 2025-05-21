package com.seusistema.controller;

import com.seusistema.dao.UsuarioDAO;
import com.seusistema.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private UsuarioDAO usuarioDAO;

    @Autowired
    public UsuarioController(DataSource dataSource) throws SQLException {
        Connection conn = dataSource.getConnection();
        this.usuarioDAO = new UsuarioDAO(conn);
    }

    @GetMapping
    public List<Usuario> listar() throws SQLException {
        return usuarioDAO.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable int id) throws SQLException {
        return usuarioDAO.buscarPorId(id);
    }

    @PostMapping
    public void adicionar(@RequestBody Usuario usuario) throws SQLException {
        usuarioDAO.adicionar(usuario);
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable int id, @RequestBody Usuario usuario) throws SQLException {
        usuario.setId(id);
        usuarioDAO.atualizar(usuario);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable int id) throws SQLException {
        usuarioDAO.excluir(id);
    }
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }

}
