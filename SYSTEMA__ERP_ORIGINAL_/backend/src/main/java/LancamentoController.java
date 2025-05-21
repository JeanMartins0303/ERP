import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.ArrayList;

@RestController
public class LancamentoController {

    // Exemplo de lista em memória (substitua por serviço/DAO real)
    private List<Lancamento> lancamentos = new ArrayList<>();

    @PostMapping("/lancamento")
    public ResponseEntity<?> salvar(@RequestBody Lancamento l) {
        lancamentos.add(l);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/lancamentos")
    public List<Lancamento> listar() {
        return lancamentos;
    }

    @DeleteMapping("/lancamento/{id}")
    public ResponseEntity<?> excluir(@PathVariable int id) {
        lancamentos.removeIf(l -> l.getId() == id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/lancamento")
    public ResponseEntity<?> atualizar(@RequestBody Lancamento l) {
        for (int i = 0; i < lancamentos.size(); i++) {
            if (lancamentos.get(i).getId() == l.getId()) {
                lancamentos.set(i, l);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/financeiro/saldo")
    public double saldo() {
        // Exemplo: soma de valores fictícios
        return lancamentos.stream().mapToDouble(Lancamento::getValor).sum();
    }
}