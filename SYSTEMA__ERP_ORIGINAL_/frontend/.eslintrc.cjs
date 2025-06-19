module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // Ignorar arquivos gerados e pastas de build
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.min.js',
    '*.bundle.js'
  ],
  rules: {
    // Regras de qualidade de código - mais flexíveis para desenvolvimento
    'no-console': 'warn', // Permitir console.log durante desenvolvimento
    'no-debugger': 'error',
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: 'error',
    curly: 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'warn', // Mudado para warning - menos restritivo
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'warn', // Mudado para warning - menos restritivo
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-useless-catch': 'warn', // Mudado para warning
    radix: 'warn', // Mudado para warning - menos restritivo
    yoda: 'error',
    
    // Regras de formatação - mais flexíveis
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs'],
    camelcase: ['warn', { properties: 'never' }], // Mais flexível para propriedades
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': 'error',
    'func-call-spacing': ['error', 'never'],
    indent: ['error', 2],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': 'off', // Desabilitado - pode causar problemas no Windows
    'max-len': ['warn', { 
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }], // Permite aspas duplas quando necessário
    semi: ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    
    // Regras adicionais para melhor qualidade
    'no-empty': 'warn', // Blocos vazios são warnings
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-constant-condition': 'warn'
  },
  globals: {
    Chart: 'readonly',
    CONFIG: 'readonly',
    // Adicionar globais comuns do browser
    window: 'readonly',
    document: 'readonly',
    console: 'readonly',
    setTimeout: 'readonly',
    setInterval: 'readonly',
    clearTimeout: 'readonly',
    clearInterval: 'readonly',
    fetch: 'readonly',
    localStorage: 'readonly',
    sessionStorage: 'readonly'
  }
};
