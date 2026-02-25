# 25/02/2026 - Ajuste Modal Centralizado Status Tarefa

## Objetivo

Ajustar a abertura do menu de `Status` e `Tipo de tarefa` da lista de pendencias para que seja exibido como modal centralizado na tela, evitando ultrapassar os limites visiveis da viewport.

## O que foi implementado

- Substituicao do menu flutuante ancorado por um modal centralizado com backdrop.
- Renderizacao mantida via portal em `document.body`.
- Modal com:
  - `fixed inset-0` + `flex items-center justify-center`
  - fundo escurecido (`bg-black/25`)
  - largura fixa `w-[292px]`
  - limite de altura com scroll interno (`max-h-[80vh] overflow-y-auto`)
- Fechamento ao clicar fora do card do modal.
- Mantidas as mesmas funcionalidades internas:
  - abas `Status` e `Tipo de tarefa`
  - alteracao de status
  - alteracao de tipo de tarefa
  - acao de configuracoes de tipo.

## Arquivo alterado

- `src/features/sidebar/components/SidebarSecondary.tsx`

## Resultado esperado

- O menu nao ultrapassa mais a area util da tela.
- O conteudo aparece sempre centralizado como modal, independente da posicao da tarefa na sidebar.
