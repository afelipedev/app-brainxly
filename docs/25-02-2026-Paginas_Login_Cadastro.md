# 25/02/2026 - Páginas de Login e Cadastro

## O que foi implementado

Implementação das páginas de login e cadastro da aplicação Brainxly, baseadas no design do Figma (Login Page Web UI Design — Community). Layout split com formulário à esquerda e imagem de fundo à direita.

### Funcionalidades

- **Tela de Login**: inputs de email, senha e botão de login
- **Tela de Cadastro**: inputs de email, senha, confirmação de senha e botão de cadastrar
- **Logo Brainxly**: logomark à esquerda do título, baseado no design system (Primary/500 e Primary/700)
- **Alternância**: link para trocar entre login e cadastro
- **Validação**: confirmação de senha e senha mínima de 6 caracteres no cadastro

### Arquivos criados

1. **src/auth/components/BrainxlyLogo.tsx**
   - Componente SVG do logomark (formas losango em roxo)
   - Props: `size`, `className`

2. **src/auth/components/AuthHeader.tsx**
   - Cabeçalho com logo + título "Brainxly" + tagline
   - Reutilizado em login e cadastro

3. **src/auth/components/AuthLayout.tsx**
   - Layout split: conteúdo à esquerda, imagem Unsplash à direita
   - Gradiente de transição entre formulário e imagem

4. **src/auth/components/LoginForm.tsx**
   - Formulário de login (email, senha, botão Entrar)
   - Link "Cadastre-se aqui!" para alternar

5. **src/auth/components/RegisterForm.tsx**
   - Formulário de cadastro (email, senha, confirmar senha, botão Cadastrar)
   - Validação de senhas coincidentes e mínimo 6 caracteres
   - Link "Faça login aqui!" para alternar

6. **src/auth/pages/AuthPage.tsx**
   - Página que alterna entre LoginForm e RegisterForm via state

7. **src/auth/components/index.ts**
   - Barrel export dos componentes

### Arquivos alterados

- **src/App.tsx**: renderiza `AuthPage` como conteúdo principal
- **index.html**: título alterado para "Brainxly"

### Design (Figma)

- **Fonte**: Figma MCP — Login Page Web UI Design (Community)
- **Cores**: #3568FF (botão primário), #7E8B9E (texto secundário), #323A46 (labels), #FAFAFC (background input), #CBD1D8 (bordas)
- **Não implementado**: botões de social login (Google, Microsoft), conforme solicitado

### Estrutura de pastas (feature auth)

```
src/auth/
├── components/
│   ├── AuthHeader.tsx
│   ├── AuthLayout.tsx
│   ├── BrainxlyLogo.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── index.ts
└── pages/
    └── AuthPage.tsx
```
