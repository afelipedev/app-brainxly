# 25/02/2026 - Ajuste de alinhamento dos inputs e expansão da imagem

## O que foi implementado

Ajustes visuais na página de login/cadastro:

- **Labels (títulos) dos inputs alinhados à esquerda** (sem herdar centralização do template)
- **Painel da imagem expandido até a borda direita da viewport**, preenchendo toda a lateral direita

## Alterações realizadas

### 1) Remoção do estilo centralizado do template

- **Arquivo alterado**: `src/App.css`
- Ajustado `#root` para não limitar largura e não centralizar texto:
  - removido `max-width`, `padding` e `text-align: center`
  - aplicado `width: 100%` e `text-align: initial`

### 2) AuthLayout: alinhamento e expansão do painel direito

- **Arquivo alterado**: `src/auth/components/AuthLayout.tsx`
- Adicionado `text-left` no container do conteúdo à esquerda
- Painel direito agora usa `left-[calc(50%+38px)]` até `right-0` (preenche a lateral direita)

