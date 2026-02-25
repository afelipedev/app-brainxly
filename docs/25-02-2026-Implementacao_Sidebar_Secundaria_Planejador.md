# 25/02/2026 - Implementacao Sidebar Secundaria Planejador

## Objetivo

Implementar com alta fidelidade visual e funcional o conteudo da sidebar secundaria do modulo Planejador, com base nas imagens de referencia, mantendo os outros modulos da sidebar sem regressao.

## O que foi implementado

- Header do Planejador:
  - titulo `Planejador` alinhado a esquerda.
  - botao `+` fixo no canto direito com dropdown de criacao.
  - botao de colapsar (`<<`) ao lado esquerdo do `+`, exibido em hover do header.

- Dropdown do botao `+` (Planejador):
  - `Criar` (label)
  - `Evento`
  - `Tempo de Foco`
  - `De Folga`
  - divisor visual
  - `Tarefa`
  - clique dos itens abre modal placeholder para fluxo futuro.

- Bloco `Prioridades`:
  - renderizacao de prioridades.
  - criacao de nova prioridade por input (`Adicionar prioridade`).
  - reordenacao por drag and drop nativo.
  - clique em item abre modal placeholder de criacao.

- Bloco `Reuniao com`:
  - input de busca com icone de pessoas.
  - lista de resultados (mock de clientes) com selecao.
  - contador de participantes e acao `Apagar tudo`.
  - participantes exibidos com avatar circular e nome.
  - clique no nome abre modal placeholder de agendamento.

- Bloco `Atribuidas a mim`:
  - lista tarefas atribuídas ao usuario logado (mock local).
  - estado vazio com mensagem de apoio.

- Bloco `Hoje e atrasadas`:
  - filtro por tarefas de hoje e tarefas vencidas.
  - estado vazio com mensagem de apoio.

- Bloco `Lista de pendencias`:
  - filtro de pesquisa.
  - tarefas pendentes com icone circular por status.
  - clique no titulo da tarefa abre modal placeholder de agendamento.
  - clique no icone abre popover lateral com abas:
    - `Status`
    - `Tipo de tarefa`
  - alteracao de status e tipo atualiza imediatamente o estado local da sidebar.

- Aba `Status`:
  - grupos `Nao iniciado`, `Ativo`, `Fechado`.
  - status implementados com cor/indicador:
    - Aberto (`OPEN`) - circulo vazado
    - Pendente (`PENDING`) - amarelo
    - Aceito (`ACCEPTED`) - roxo
    - Em progresso (`EM PROGRESSO`) - azul
    - Em review (`IN REVIEW`) - laranja
    - Rejeitado (`REJECTED`) - marrom
    - Bloqueado (`BLOCKED`) - vermelho
    - Concluido (`CLOSED`) - verde

- Aba `Tipo de tarefa`:
  - input de busca.
  - subtitulo `Tipos de tarefa` com botao de engrenagem.
  - tipos iniciais:
    - `Epico`
    - `Tarefa (padrao)`
    - `Bug`
  - selecao persiste no estado local da tarefa.

## Arquivo alterado

- `src/features/sidebar/components/SidebarSecondary.tsx`

## Observacoes tecnicas

- Implementacao com estado local (mock) para acelerar validacao visual/funcional nesta fase.
- Fluxos de integracao real (Google Calendar, modal completo, configuracoes de tipo e dados de backend) foram mantidos como placeholders, conforme solicitado.
- Estrutura mantida simples e direta (KISS/YAGNI), com funcoes auxiliares reutilizaveis para reduzir repeticao (DRY).
