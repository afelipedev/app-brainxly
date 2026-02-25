# Dropdowns — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `18:319`, `1050:105632`, `1050:146925`, `1096:4590`, `1096:2`, `1096:3156`  
> **Status:** Draft

## Visão Geral

Componentes de dropdown: trigger (select/combobox), painel flutuante com lista de itens, e variações com header de perfil, ícones, checkboxes, atalhos de teclado e estados de seleção.

## Anatomia

### Trigger (campo de abertura)

- **Label**: "Team member", "Search", etc.
- **Placeholder**: "Select team member", "Search"
- **Conteúdo selecionado**: nome ou valor
- **Ícone**: chevron (↓ fechado, ↑ aberto)
- **Prefix** (opcional): ícone person, avatar, status dot, lupa

### Painel (menu)

- **Background**: White (#FFFFFF)
- **Shadow**: Shadow/lg
- **Border-radius**: consistente
- **Header** (opcional): avatar + nome + email + status dot + ellipsis (…)

### List Item

- **Texto primário**: nome ou label
- **Texto secundário** (opcional): @username em Gray/500
- **Leading** (opcional): nenhum, person icon, avatar, status dot (verde)
- **Trailing** (opcional): checkmark (selecionado), shortcut, número

## Variantes de Trigger

| Variante | Prefix | Placeholder | Uso |
|----------|--------|-------------|-----|
| **Basic** | — | Select team member | Select simples |
| **Person icon** | Ícone person | Select team member | Seleção de usuário |
| **Avatar** | Avatar circular | Select team member | Com foto |
| **Status dot** | Dot verde | Select team member | Status online |
| **Search** | Lupa | Search | Combobox/search |

## Variantes de Menu

| Variante | Descrição |
|----------|-----------|
| **Plain text** | Apenas labels |
| **With icons** | Ícone à esquerda de cada item |
| **With checkboxes** | Checkbox para multi-seleção |
| **With shortcuts** | Atalhos à direita (⇧⌘P, ⇧S, ⇧K, etc.) |
| **With numbers** | Número à direita |
| **With header** | Header "Account menu" ou perfil do usuário |

## List Item — Tipos

| Tipo | Controle | Uso |
|------|----------|-----|
| **Plain** | Nenhum | Ações, navegação |
| **Radio** | Radio button | Seleção única |
| **Checkbox** | Checkbox | Multi-seleção |

## Estados do List Item

| Estado | Background | Descrição |
|--------|------------|-----------|
| **Default** | White | Repouso |
| **Hover** | Gray/50 #F9FAFB | Mouse sobre |
| **Selected** | Primary/50 #F9F5FF ou Gray/100 #F2F4F7 | Item selecionado |
| **Disabled** | — | Texto e ícones com opacidade reduzida |

## Estados do Trigger

| Estado | Border | Chevron |
|--------|--------|---------|
| **Default** | Gray/300 | ↓ |
| **Focused/Open** | Primary/300 + focus ring 4px Primary/100 | ↑ |

## Menu Items (Account)

- View profile
- Settings
- Keyboard shortcuts
- Company profile
- Team
- Invite colleagues
- Changelog
- Slack Community
- Support
- API
- Log out

## Atalhos de Teclado (exemplo)

| Item | Shortcut |
|------|----------|
| View profile | ⇧⌘P |
| Settings | ⇧S |
| Keyboard shortcuts | ⇧K |
| Company profile | ⇧C |
| Team | ⇧T |
| Invite colleagues | ⇧I |
| Changelog | ⇧N |
| Slack Community | ⇧L |
| Support | ⇧H |
| API | ⇧A |
| Log out | ⇧Q |

## Header de Perfil (Account dropdown)

- **Avatar**: circular, com status dot verde
- **Nome**: Text sm/Semibold, Gray/900
- **Email**: Text xs/Regular, Gray/500
- **Ações**: ellipsis (…) à direita

## Tokens Utilizados

### Cores

| Token | HEX | Uso |
|-------|-----|-----|
| White | #FFFFFF | Background do painel e trigger |
| Gray/50 | #F9FAFB | Hover list item, background trigger |
| Gray/100 | #F2F4F7 | Selected list item |
| Gray/200 | #EAECF0 | Dividers |
| Gray/300 | #D0D5DD | Border trigger default |
| Gray/500 | #667085 | Texto secundário, placeholder |
| Gray/700 | #344054 | Label |
| Gray/900 | #101828 | Texto primário |
| Primary/50 | #F9F5FF | Selected (algumas variantes) |
| Primary/300 | #D6BBFB | Border focused |
| Primary/600 | #7F56D9 | Checkmark, ícones |
| Success/500 | #12B76A | Status dot, checkmark |

### Tipografia

| Token | Uso |
|-------|-----|
| Text xs/Regular | Email, username secundário |
| Text sm/Regular | Menu items |
| Text sm/Medium | Label, item selecionado |
| Text sm/Semibold | Nome no header |
| Text md/Regular | Valor no trigger |
| Text md/Medium | Valor no trigger (alguns estados) |

### Sombras

| Token | Uso |
|-------|-----|
| Shadow/lg | Painel do dropdown |
| Focus ring/4px primary-100 | Trigger focused |

## Código Pronto para Uso

```css
.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #FFFFFF;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  font-size: 16px;
  color: #101828;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.dropdown-trigger:focus,
.dropdown-trigger[data-state="open"] {
  border-color: #D6BBFB;
  box-shadow: 0 0 0 4px #F4EBFF;
}
.dropdown-panel {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.031),
              0px 12px 16px -4px rgba(16, 24, 40, 0.078);
  padding: 4px 0;
}
.dropdown-item {
  padding: 10px 14px;
  font-size: 14px;
  color: #101828;
}
.dropdown-item:hover {
  background: #F9FAFB;
}
.dropdown-item[data-selected] {
  background: #F9F5FF;
}
.dropdown-item[data-disabled] {
  opacity: 0.5;
}
```

## Comportamento

- **Abertura**: clique no trigger ou teclado (Enter/Space)
- **Navegação**: setas para cima/baixo
- **Seleção**: Enter ou clique
- **Fechamento**: clique fora, Escape, ou após seleção (em select)
- **Atalhos**: exibir e suportar shortcuts quando presentes

## Notas e Observações

- Lista de usuários exemplo: Phoenix Baker, Olivia Rhye, Lana Steiner, Demi Wilkinson, Candice Wu, Natali Craig, Drew Cano.
- Avatar e status dot são opcionais no list item.
- Referência de cores em `Colors-design.md`, sombras em `Shadows-design.md`.
