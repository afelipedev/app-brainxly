# 25/02/2026 - Ajuste de Gradiente (Login) via Figma Desktop

## O que foi implementado

Ajuste do **efeito de transição horizontal** entre o branco do layout e a imagem do lado direito na página de login/cadastro, reproduzindo com alta fidelidade o gradiente do frame do Figma (via MCP do Figma Desktop).

## Referência (Figma)

- Frame: Login Page (`nodeId` `3:2`)
- Efeito observado: **faixa de 240px** com gradiente `to left`, aplicada em **duas camadas** para intensificar o “blend” do branco com o background.

## Alterações realizadas

- **Arquivo alterado**: `src/auth/components/AuthLayout.tsx`
  - Adicionada uma base branca no painel direito (`bg-white`)
  - Adicionadas **duas** camadas de gradiente sobre a imagem:
    - `w-[240px]`
    - `bg-gradient-to-l from-[rgba(255,255,255,0)] to-white`

## Resultado esperado

O background abstrato do lado direito “dissolve” no branco do lado esquerdo, parecendo **um único layout** na direção horizontal (direita → esquerda), alinhado ao comportamento do design no Figma Desktop.

