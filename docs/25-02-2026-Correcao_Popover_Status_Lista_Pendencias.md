# 25/02/2026 - Correcao Popover Status Lista Pendencias

## Objetivo

Corrigir o comportamento do menu de status/tipo da tarefa na `Lista de pendencias` do modulo Planejador para abrir fora da sidebar secundaria, sobrepondo o layout a direita da tarefa, sem clipping pelo container com scroll.

## O que foi corrigido

- O popover deixou de ser renderizado como `absolute` dentro do item da lista.
- O popover passou a ser renderizado via portal (`createPortal`) no `document.body`.
- Posicionamento alterado para `fixed`, ancorado no botao de status da tarefa:
  - abre a direita do item clicado;
  - respeita limite horizontal da viewport para evitar corte.
- Adicionado reposicionamento automatico ao:
  - rolar a pagina/container;
  - redimensionar a janela.
- Adicionado fechamento ao clicar fora do popover.

## Arquivo alterado

- `src/features/sidebar/components/SidebarSecondary.tsx`

## Resultado esperado

- O dropdown/modal de status e tipo nao fica mais "preso" dentro da sidebar secundaria.
- O menu aparece sobreposto, fora da area da sidebar, alinhado a direita da tarefa selecionada.
