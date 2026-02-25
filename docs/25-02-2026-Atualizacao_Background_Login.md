# 25/02/2026 - Atualização do Background (Login)

## O que foi implementado

Substituição do overlay de gradiente do lado direito no `AuthLayout` pela imagem anexada (background abstrato desfocado), conforme solicitado.

## Alterações realizadas

- **Imagem adicionada**: `public/auth-bg.png`
- **Componente atualizado**: `src/auth/components/AuthLayout.tsx`
  - Removido o elemento:
    - `<div class="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent" ... />`
  - Background agora é renderizado via:
    - `<img src="/auth-bg.png" ... />`

## Observações

- A alteração mantém o layout split (formulário à esquerda + background à direita).
- Não houve mudança nos formulários de login/cadastro ou inclusão de social login.

