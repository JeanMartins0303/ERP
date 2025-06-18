// Testes para os componentes de upload
describe('Componentes de Upload', () => {
    // Testes do Form File
    describe('Form File', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="form-file">
                    <input type="file" id="file">
                    <label for="file">
                        <span class="icon">📄</span>
                        <span class="text">Selecionar Arquivo</span>
                    </label>
                </div>
            `;
        });

        test('deve ter a estrutura correta', () => {
            const formFile = document.querySelector('.form-file');
            expect(formFile).toBeTruthy();
            expect(formFile.querySelector('input[type="file"]')).toBeTruthy();
            expect(formFile.querySelector('label')).toBeTruthy();
        });

        test('deve aplicar classe is-success ao fazer upload com sucesso', () => {
            const formFile = document.querySelector('.form-file');
            const input = formFile.querySelector('input');
            
            // Simula upload bem-sucedido
            const event = new Event('change');
            input.dispatchEvent(event);
            
            expect(formFile.classList.contains('is-success')).toBeTruthy();
        });

        test('deve aplicar classe is-error ao falhar upload', () => {
            const formFile = document.querySelector('.form-file');
            const input = formFile.querySelector('input');
            
            // Simula erro no upload
            const event = new Event('error');
            input.dispatchEvent(event);
            
            expect(formFile.classList.contains('is-error')).toBeTruthy();
        });
    });

    // Testes do Form Image
    describe('Form Image', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="form-image">
                    <input type="file" id="image" accept="image/*">
                    <label for="image">
                        <span class="icon">🖼️</span>
                        <span class="text">Selecionar Imagem</span>
                    </label>
                    <div class="preview"></div>
                </div>
            `;
        });

        test('deve ter a estrutura correta', () => {
            const formImage = document.querySelector('.form-image');
            expect(formImage).toBeTruthy();
            expect(formImage.querySelector('input[type="file"]')).toBeTruthy();
            expect(formImage.querySelector('label')).toBeTruthy();
            expect(formImage.querySelector('.preview')).toBeTruthy();
        });

        test('deve mostrar preview da imagem ao selecionar', () => {
            const formImage = document.querySelector('.form-image');
            const input = formImage.querySelector('input');
            const preview = formImage.querySelector('.preview');
            
            // Simula seleção de imagem
            const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
            Object.defineProperty(input, 'files', {
                value: [file]
            });
            
            const event = new Event('change');
            input.dispatchEvent(event);
            
            expect(preview.querySelector('img')).toBeTruthy();
        });

        test('deve validar formato da imagem', () => {
            const formImage = document.querySelector('.form-image');
            const input = formImage.querySelector('input');
            
            // Simula arquivo inválido
            const file = new File([''], 'test.txt', { type: 'text/plain' });
            Object.defineProperty(input, 'files', {
                value: [file]
            });
            
            const event = new Event('change');
            input.dispatchEvent(event);
            
            expect(formImage.classList.contains('is-error')).toBeTruthy();
        });
    });

    // Testes do Form Video
    describe('Form Video', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="form-video">
                    <input type="file" id="video" accept="video/*">
                    <label for="video">
                        <span class="icon">🎥</span>
                        <span class="text">Selecionar Vídeo</span>
                    </label>
                    <div class="preview"></div>
                </div>
            `;
        });

        test('deve ter a estrutura correta', () => {
            const formVideo = document.querySelector('.form-video');
            expect(formVideo).toBeTruthy();
            expect(formVideo.querySelector('input[type="file"]')).toBeTruthy();
            expect(formVideo.querySelector('label')).toBeTruthy();
            expect(formVideo.querySelector('.preview')).toBeTruthy();
        });

        test('deve mostrar player de vídeo ao selecionar', () => {
            const formVideo = document.querySelector('.form-video');
            const input = formVideo.querySelector('input');
            const preview = formVideo.querySelector('.preview');
            
            // Simula seleção de vídeo
            const file = new File([''], 'test.mp4', { type: 'video/mp4' });
            Object.defineProperty(input, 'files', {
                value: [file]
            });
            
            const event = new Event('change');
            input.dispatchEvent(event);
            
            expect(preview.querySelector('video')).toBeTruthy();
        });

        test('deve validar formato do vídeo', () => {
            const formVideo = document.querySelector('.form-video');
            const input = formVideo.querySelector('input');
            
            // Simula arquivo inválido
            const file = new File([''], 'test.txt', { type: 'text/plain' });
            Object.defineProperty(input, 'files', {
                value: [file]
            });
            
            const event = new Event('change');
            input.dispatchEvent(event);
            
            expect(formVideo.classList.contains('is-error')).toBeTruthy();
        });

        test('deve mostrar controles de reprodução', () => {
            const formVideo = document.querySelector('.form-video');
            const input = formVideo.querySelector('input');
            
            // Simula seleção de vídeo
            const file = new File([''], 'test.mp4', { type: 'video/mp4' });
            Object.defineProperty(input, 'files', {
                value: [file]
            });
            
            const event = new Event('change');
            input.dispatchEvent(event);
            
            const controls = formVideo.querySelector('.controls');
            expect(controls).toBeTruthy();
            expect(controls.querySelector('.control-button')).toBeTruthy();
        });
    });

    // Testes de Responsividade
    describe('Responsividade', () => {
        test('deve adaptar tamanho em telas pequenas', () => {
            // Simula tela pequena
            window.innerWidth = 480;
            window.dispatchEvent(new Event('resize'));
            
            const formFile = document.querySelector('.form-file');
            const formImage = document.querySelector('.form-image');
            const formVideo = document.querySelector('.form-video');
            
            expect(formFile.classList.contains('is-responsive')).toBeTruthy();
            expect(formImage.classList.contains('is-responsive')).toBeTruthy();
            expect(formVideo.classList.contains('is-responsive')).toBeTruthy();
        });
    });

    // Testes de Tema Escuro
    describe('Tema Escuro', () => {
        test('deve aplicar estilos do tema escuro', () => {
            document.documentElement.setAttribute('data-theme', 'dark');
            
            const formFile = document.querySelector('.form-file');
            const formImage = document.querySelector('.form-image');
            const formVideo = document.querySelector('.form-video');
            
            expect(formFile.classList.contains('is-dark')).toBeTruthy();
            expect(formImage.classList.contains('is-dark')).toBeTruthy();
            expect(formVideo.classList.contains('is-dark')).toBeTruthy();
        });
    });
}); 