package com.arjuncodes.hello.controller;

import com.arjuncodes.hello.model.Usuario;
import com.arjuncodes.hello.dto.LoginDTO;
import com.arjuncodes.hello.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Optional<Usuario> user = usuarioRepository.findByEmail(login.getEmail());

        if (user.isPresent() && passwordEncoder.matches(login.getSenha(), user.get().getSenha())) {
            return ResponseEntity.ok("Login efetuado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
    }
}
