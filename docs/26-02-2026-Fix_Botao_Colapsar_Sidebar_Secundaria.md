# 26/02/2026 - Fix Botão Colapsar Sidebar Secundária

## O que foi implementado

Correção do bug nos botões de colapsar da sidebar secundária que não exibiam a sidebar primária (com ícones) ao serem clicados.

## Problema identificado

Ao clicar nos ícones de colapsar nas sidebars secundárias (Docs Hub, Equipes, IA Hub, Espacos, etc.):
- A sidebar secundária era fechada corretamente (`setSecondaryOpen(false)`)
- Porém a sidebar primária com ícones **não era exibida**
- No mobile: a primária fica oculta no container com `hidden md:flex` e só aparece via drawer
- No desktop: a primária deveria permanecer visível no mesmo container

## Solução aplicada

No `SidebarLayout.tsx`:
1. **useEffect simplificado**: Quando `isSecondaryOpen` muda para `false`, abre automaticamente o drawer da sidebar primária (`setPrimaryDrawerOpen(true)`). O drawer tem `md:hidden`, então no desktop não é exibido (a primária já está no container lateral).
2. **shrink-0 no container**: Adicionado `shrink-0` ao container das sidebars para garantir que não encolha no layout flex.

Assim, ao colapsar a sidebar secundária:
- **Mobile**: O drawer da primária abre automaticamente com os ícones de navegação
- **Desktop**: A primária permanece visível no container lateral (SidebarSecondary retorna null, sobrando apenas SidebarPrimary)

## Arquivos modificados

- `src/features/sidebar/components/SidebarLayout.tsx`

## Comportamento esperado

- **Desktop (md+)**: Ao colapsar a secundária, a primária permanece visível no container lateral
- **Mobile**: Ao colapsar a secundária, o drawer da primária abre automaticamente, exibindo os ícones de navegação
