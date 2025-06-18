# Componentes CSS do Sistema ERP

Este diretório contém todos os componentes CSS utilizados no sistema ERP. Cada componente é modular e pode ser facilmente reutilizado em diferentes partes da aplicação.

## Índice

1. [Formulários](#formulários)
2. [Navegação](#navegação)
3. [Feedback](#feedback)
4. [Layout](#layout)
5. [Multimídia](#multimídia)

## Formulários

### Componentes de Upload

#### Form File (`form-file.css`)
Componente para upload de arquivos genéricos.

```html
<div class="form-file">
    <input type="file" id="file">
    <label for="file">
        <span class="icon">📄</span>
        <span class="text">Selecionar Arquivo</span>
    </label>
</div>
```

**Estados:**
- `.is-success` - Upload bem-sucedido
- `.is-error` - Erro no upload
- `.is-loading` - Carregando
- `.is-small` - Tamanho pequeno
- `.is-large` - Tamanho grande

#### Form Image (`form-image.css`)
Componente para upload de imagens com preview.

```html
<div class="form-image">
    <input type="file" id="image" accept="image/*">
    <label for="image">
        <span class="icon">🖼️</span>
        <span class="text">Selecionar Imagem</span>
    </label>
    <div class="preview">
        <img src="exemplo.jpg" alt="Preview">
    </div>
</div>
```

**Formatos suportados:**
- JPG
- PNG
- GIF
- WebP

#### Form Video (`form-video.css`)
Componente para upload de vídeos com player integrado.

```html
<div class="form-video">
    <input type="file" id="video" accept="video/*">
    <label for="video">
        <span class="icon">🎥</span>
        <span class="text">Selecionar Vídeo</span>
    </label>
    <div class="preview">
        <video controls>
            <source src="exemplo.mp4" type="video/mp4">
        </video>
    </div>
</div>
```

**Formatos suportados:**
- MP4
- WebM
- MOV
- AVI

### Outros Componentes de Formulário

#### Form Input (`form-input.css`)
Inputs de texto com validação e estados.

#### Form Select (`form-select.css`)
Selects customizados com busca e múltipla seleção.

#### Form Checkbox (`form-checkbox.css`)
Checkboxes e radio buttons estilizados.

#### Form Textarea (`form-textarea.css`)
Áreas de texto com redimensionamento.

## Navegação

### Menu (`menu.css`)
Menu principal do sistema.

### Sidebar (`sidebar.css`)
Barra lateral com navegação.

### Breadcrumb (`breadcrumb.css`)
Navegação hierárquica.

### Pagination (`pagination.css`)
Paginação de listas e tabelas.

## Feedback

### Alert (`alert.css`)
Mensagens de alerta e notificação.

### Modal (`modal.css`)
Janelas modais e diálogos.

### Toast (`toast.css`)
Notificações temporárias.

### Progress (`progress.css`)
Barras de progresso e spinners.

## Layout

### Grid (`grid.css`)
Sistema de grid responsivo.

### Card (`card.css`)
Cards e painéis.

### Table (`table.css`)
Tabelas e listas.

### Container (`container.css`)
Containers e wrappers.

## Multimídia

### Gallery (`gallery.css`)
Galeria de imagens.

### Carousel (`carousel.css`)
Carrossel de conteúdo.

### Lightbox (`lightbox.css`)
Visualizador de mídia.

## Variáveis CSS

Todos os componentes utilizam variáveis CSS para manter consistência visual:

```css
:root {
    /* Cores */
    --color-primary: #007bff;
    --color-success: #28a745;
    --color-error: #dc3545;
    --color-warning: #ffc107;
    --color-info: #17a2b8;

    /* Espaçamento */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Tipografia */
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;

    /* Bordas */
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 1rem;

    /* Transições */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## Boas Práticas

1. **Modularidade**
   - Cada componente deve ser independente
   - Evitar dependências entre componentes
   - Utilizar BEM para nomenclatura

2. **Responsividade**
   - Mobile-first
   - Breakpoints consistentes
   - Testar em diferentes dispositivos

3. **Acessibilidade**
   - Contraste adequado
   - Estados de foco visíveis
   - Suporte a leitores de tela

4. **Performance**
   - Minimizar especificidade
   - Evitar seletores complexos
   - Otimizar animações

## Contribuição

1. Crie uma branch para sua feature
2. Siga o padrão de código
3. Adicione testes
4. Documente as mudanças
5. Faça o pull request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 