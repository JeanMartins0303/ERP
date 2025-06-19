import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        produtos: resolve(__dirname, 'produtos.html'),
        estoque: resolve(__dirname, 'estoque.html'),
        clientes: resolve(__dirname, 'clientes.html'),
        financeiro: resolve(__dirname, 'financeiro.html'),
        relatorios: resolve(__dirname, 'relatorios.html'),
        usuarios: resolve(__dirname, 'usuarios.html'),
        configuracoes: resolve(__dirname, 'configuracoes.html'),
        login: resolve(__dirname, 'login.html'),
        cadastro: resolve(__dirname, 'cadastro.html'),
        cardapio: resolve(__dirname, 'cardapio.html'),
        mesas: resolve(__dirname, 'mesas.html'),
        ajuda: resolve(__dirname, 'ajuda.html'),
        perfil: resolve(__dirname, 'perfil.html'),
        editar: resolve(__dirname, 'editar.html'),
        listar: resolve(__dirname, 'listar.html'),
        'recuperar-senha': resolve(__dirname, 'recuperar-senha.html')
      },
      output: {
        manualChunks: {
          vendor: ['chart.js', 'bootstrap'],
          utils: ['./js/config.js', './js/notifications.js'],
          auth: ['./js/auth.js', './js/login.js', './js/cadastro.js'],
          dashboard: ['./js/dashboard.js', './js/dashboard-data.js'],
          modules: [
            './js/produtos.js',
            './js/estoque.js',
            './js/clientes.js',
            './js/financeiro.js',
            './js/relatorios.js'
          ]
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  optimizeDeps: {
    include: ['chart.js', 'bootstrap']
  }
});
