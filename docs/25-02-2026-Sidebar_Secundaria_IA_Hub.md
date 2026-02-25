# 25-02-2026 - Sidebar Secundária IA Hub

## Objetivo

Implementar o conteúdo da sidebar secundária do módulo IA Hub, reproduzindo o layout de referência com fidelidade visual e funcional.

## O que foi implementado

### 1) Dados do IA Hub (`sidebar.data.ts`)

- **IA_HUB_CRIAR_ITEMS**: Itens do menu "Criar" com ícones
  - Pergunte à IA (ícone Sparkles)
  - Superagente (ícone Glasses, badge "Hot")
- **IA_HUB_NAV_ITEMS**: Itens de navegação
  - Todos os Superagentes (ícone Users)
  - Meus Superagentes (ícone UserRound)
  - Registros de auditoria (ícone Clock)
- **IA_HUB_RECENT_CHATS**: Lista mock de chats recentes

### 2) Componente IaHubSecondaryContent

Arquivo: `src/features/sidebar/components/IaHubSecondaryContent.tsx`

**Header:**
- Título "IA Hub" à esquerda
- Botão de colapsar (<<) visível apenas em hover, à esquerda do dropdown Edit
- Dropdown button com ícone de Edit (Pencil) + ChevronDown, fixo à direita

**Popover do dropdown Edit:**
- Label "Criar" no topo
- Itens clicáveis: Pergunte à IA e Superagente (com ícones; Superagente com badge "Hot")
- Divider
- Todos os Superagentes, Meus Superagentes, Registros de auditoria
- Subtítulo "Chats recentes"
- Lista de chats recentes clicáveis

**Conteúdo principal da sidebar:**
- Ações rápidas: Pergunte à IA, Novo Superagente
- Divider
- Navegação: Todos os Superagentes, Meus Superagentes, Registros de auditoria
- Subtítulo "Chats recentes"
- Lista de chats com estado de seleção (Task Risk Review como padrão)

### 3) Integração no SidebarSecondary

O `SidebarSecondary` passa a renderizar `IaHubSecondaryContent` quando `activeModule === SidebarModule.IA_HUB`, seguindo o mesmo padrão do módulo Espaços.

## Estrutura de arquivos

```
src/features/sidebar/
├── components/
│   ├── IaHubSecondaryContent.tsx  (novo)
│   ├── EspacosSecondaryContent.tsx
│   └── SidebarSecondary.tsx       (atualizado)
└── data/
    └── sidebar.data.ts           (atualizado)
```

## Próximos passos (Fase 2)

- Implementar fluxos reais para "Pergunte à IA" e "Novo Superagente"
- Conectar navegação (Todos os Superagentes, Meus Superagentes, Registros de auditoria)
- Integrar chats recentes com dados reais (API/estado global)
- Persistir chat ativo e histórico
