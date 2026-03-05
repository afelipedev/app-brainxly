# 26/02/2026 - Sidebar Secundária Docs Hub

## Objetivo

Implementar o conteúdo da sidebar secundária do módulo Docs Hub, reproduzindo a estrutura de referência com fidelidade visual e funcional. O Docs Hub permite organizar, pesquisar e criar documentos a partir de um local centralizado.

## O que foi implementado

### 1) Dados do módulo Docs Hub (`sidebar.data.ts`)

- **DOCS_HUB_CRIAR_ITEMS**: Item do menu "Criar" – Criar documento (com ícone FileText)
- **DOCS_HUB_FAVORITES_MOCK**: Lista mock de documentos favoritos (ex.: Documentacao CTM)
- **DOCS_HUB_RECENT_PAGES_MOCK**: Lista mock de páginas recentes (ex.: Mapeamento AS Is, AAA, Sem título, etc.)

### 2) Componente DocsHubSecondaryContent

Arquivo: `src/features/sidebar/components/DocsHubSecondaryContent.tsx`

**Header:**
- Título "Docs Hub" à esquerda
- Botão de colapsar (<<) visível apenas em hover, à esquerda do dropdown +
- Dropdown button com ícone de + e ChevronDown, fixo à direita

**Popover do dropdown +:**
- Item clicável: Criar documento (com ícone e texto)
- Abre em modal/popover flutuante ao clicar no botão +

**Conteúdo principal da sidebar:**
- Todos os documentos (ícone FolderOpen)
- Meus documentos (avatar com letra "A" + badge contador)
- Arquivado (ícone Trash2)
- Divider
- Seção **Favoritos**: lista de documentos marcados como favoritos
- Seção **Páginas recentes**: lista das últimas páginas criadas

### 3) Integração no SidebarSecondary

O `SidebarSecondary` passa a renderizar `DocsHubSecondaryContent` quando `activeModule === SidebarModule.DOCS_HUB`, seguindo o mesmo padrão dos módulos Espaços, IA Hub e Equipes.

## Itens excluídos (conforme solicitado)

- Compartilhado comigo
- Privado
- Atas da Reunião
- Wikis Populares

## Estrutura de arquivos

```
src/features/sidebar/
├── components/
│   ├── DocsHubSecondaryContent.tsx  (novo)
│   ├── EquipesSecondaryContent.tsx
│   ├── EspacosSecondaryContent.tsx
│   ├── IaHubSecondaryContent.tsx
│   └── SidebarSecondary.tsx         (atualizado)
└── data/
    └── sidebar.data.ts              (atualizado)
```

## Observações

- O fluxo de criação de documento está preparado para integração na Fase 2
- Dados de favoritos e páginas recentes são mock; a integração com backend será feita posteriormente
- Badge de "Meus documentos" exibe contador fixo (4) como valor mock
