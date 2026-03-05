# 25/02/2026 - Sidebar Secundária Equipes

## Objetivo

Implementar o conteúdo da sidebar secundária do módulo Equipes, reproduzindo o layout de referência com fidelidade visual e funcional.

## O que foi implementado

### 1) Dados do módulo Equipes (`sidebar.data.ts`)

- **EQUIPES_CRIAR_ITEMS**: Item do menu "Criar" – Criar Equipe
- **EQUIPES_MOCK_TEAMS**: Lista mock de equipes (ex.: Desenvolvimento)

### 2) Componente EquipesSecondaryContent

Arquivo: `src/features/sidebar/components/EquipesSecondaryContent.tsx`

**Header:**
- Título "Equipes" à esquerda
- Botão de colapsar (<<) visível apenas em hover, à esquerda do dropdown +
- Dropdown button com ícone de + e ChevronDown, fixo à direita

**Popover do dropdown +:**
- Label "Criar" no topo
- Item clicável: Criar Equipe (abre modal)
- Todas as equipes (ícone Users) com badge number da quantidade
- Todas as pessoas (ícone UserRound) com badge number da quantidade
- Divider
- Subtítulo "Minhas equipes"
- Lista de equipes com ícone e nome

**Conteúdo principal da sidebar:**
- Todas as equipes (ícone + badge)
- Todas as pessoas (ícone + badge)
- Divider
- Subtítulo "Minhas equipes"
- Lista de equipes associadas ao workspace com ícone e nome (estado de seleção)

**Modal Criar nova equipe:**
- Input para nome da equipe
- Input para descrição (opcional)
- Botão IconPicker para selecionar ícone (biblioteca de ícones disponíveis)
- Botões Cancelar e Criar

### 3) Integração no SidebarSecondary

O `SidebarSecondary` passa a renderizar `EquipesSecondaryContent` quando `activeModule === SidebarModule.EQUIPES`, seguindo o mesmo padrão dos módulos Espaços e IA Hub.

## Estrutura de arquivos

```
src/features/sidebar/
├── components/
│   ├── EquipesSecondaryContent.tsx  (novo)
│   ├── EspacosSecondaryContent.tsx
│   ├── IaHubSecondaryContent.tsx
│   └── SidebarSecondary.tsx         (atualizado)
└── data/
    └── sidebar.data.ts             (atualizado)
```

## Observações

- Opção "Dados Analíticos" foi ignorada conforme solicitado
- Design do modal de criar equipe segue o mesmo padrão do modal de criar espaço
- Badge numbers exibem quantidade de equipes e usuários (valores mock atualizáveis)
