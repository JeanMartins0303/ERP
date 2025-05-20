package controller;

import dao.FinanceiroDAO;
import model.Financeiro;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FinanceiroController {

    @PostMapping("/financeiro")
    public ResponseEntity<?> cadastrar(@RequestBody Financeiro f) {
        FinanceiroDAO dao = new FinanceiroDAO();
        dao.inserir(f);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/financeiro")
    public List<Financeiro> listar() {
        FinanceiroDAO dao = new FinanceiroDAO();
        return dao.listar();
    }

    @DeleteMapping("/financeiro/{id}")
    public ResponseEntity<?> excluir(@PathVariable int id) {
        FinanceiroDAO dao = new FinanceiroDAO();
        dao.excluir(id);
        return ResponseEntity.ok().build();
    }
}
