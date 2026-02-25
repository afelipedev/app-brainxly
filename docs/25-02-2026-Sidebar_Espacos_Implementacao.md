# 25/02/2026 - Sidebar Espaços - Implementação Completa

## Objetivo

Implementar o conteúdo da sidebar secundária do módulo Espaços, conforme referência visual, incluindo header com ações, dropdowns, modal de criação de espaço e árvore de itens.

## O que foi implementado

### 1) Header do módulo Espaços

- **Título "Espaços"** exibido à esquerda
- **Botão dropdown (+)** fixo à direita, com menu "Criar" contendo:
  - Tarefa
  - Lista
  - Espaço
  - Documento
- **Ícones em hover** (visíveis ao passar o mouse):
  - Recolher/colapsar sidebar (`<<`) – fecha a sidebar secundária
  - Search – ao clicar, exibe input de pesquisa abaixo
  - Reticências – abre popover com:
    - Criar espaço
    - Gerenciar espaço
    - Expandir todos os itens / Fechar todos os itens (alternância conforme ação)

### 2) Modal Criar novo espaço

- Input para nome do espaço
- Input para descrição (opcional)
- **Botão "Selecionar ícone"** – ao clicar, abre biblioteca de ícones estilo Shadcn:
  - Título "Ícone" e botão Reset
  - Campo de pesquisa "Pesquisar..."
  - Botão azul com + (adicionar)
  - Grade densa de ícones Lucide com scroll
- Botões Cancelar e Continuar

### 3) Conteúdo principal

- **Todas as Tarefas** – item clicável com label "Todas as tarefas - [nome do workspace]"
- **Espaços ativos** – árvore hierárquica com mesma estrutura da sidebar Home:
  - Espaços com ícone (letra ou ícone customizado)
  - Projetos, Pastas, Listas, Sprints
  - Item "Novo Espaço" no final
  - Ações em hover (reticências, +) para itens de projeto/pasta/lista/sprint

### 4) Contexto e dados

- **SidebarContext**:
  - `expandAllNodes()` – expande toda a árvore do workspace ativo
  - `collapseAllNodes()` – recolhe toda a árvore
  - `addSpace({ name, description?, iconId? })` – cria novo espaço no workspace ativo
- **SidebarTreeNode**: campo opcional `iconId` para ícone customizado do espaço
- **sidebar.data.ts**:
  - `ESPACOS_CRIAR_ITEMS` – itens do menu Criar
  - `ESPACOS_OPTIONS_MENU` – itens do menu de reticências
  - `ESPACOS_ICON_LIBRARY` – biblioteca de ícones para espaços

### 5) Pesquisa

- Input de pesquisa exibido ao clicar no ícone de search
- Filtra a árvore de espaços em tempo real (por label)

### 6) Ajuste de tipos

- `SidebarModule` convertido de `enum` para `const object` para compatibilidade com `erasableSyntaxOnly` do tsconfig.

## Arquivos modificados/criados

- `src/features/sidebar/components/EspacosSecondaryContent.tsx` (novo)
- `src/features/sidebar/components/SidebarSecondary.tsx`
- `src/features/sidebar/context/SidebarContext.tsx`
- `src/features/sidebar/data/sidebar.data.ts`
- `src/features/sidebar/types/sidebar.types.ts`

## Estrutura de pastas (feature sidebar)

```
sidebar/
├── components/
│   ├── EspacosSecondaryContent.tsx  (novo)
│   ├── SidebarSecondary.tsx
│   └── ...
├── context/
├── data/
├── hooks/
└── types/
```

## Critérios de aceite

- [x] Título Espaços à esquerda
- [x] Dropdown + com menu Criar (Tarefa, Lista, Espaço, Documento)
- [x] Ícones em hover: recolher, search, reticências
- [x] Search: input exibido ao clicar
- [x] Menu reticências: criar espaço, gerenciar espaço, expandir/fechar todos
- [x] Modal criar espaço: nome, descrição, seletor de ícone, cancelar/continuar
- [x] Todas as Tarefas
- [x] Espaços ativos e árvore com mesma estrutura da Home

## Próximos passos (Fase 2)

- Implementar ações de Tarefa, Lista e Documento no menu Criar
- Implementar "Gerenciar espaço"
- Integrar com backend/Supabase para persistência de espaços
