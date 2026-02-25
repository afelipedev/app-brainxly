## Extração — Design System (Dropdowns)

> **Data:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — múltiplos nodes  
> **Links:**
> - `node-id=18-319` (List items: plain, radio, checkbox; estados; accelerators)
> - `node-id=1050-105632` (12 variações de menu: plain, iconic, checkbox, shortcuts, header)
> - `node-id=1050-146925` (Account dropdown com trigger e perfil)
> - `node-id=1096-4590` (Dropdowns de seleção de usuário: 4 ícones x 3 conteúdos)
> - `node-id=1096-2` (Triggers: Basic, Person, Avatar, Status, Search; 3 estados)
> - `node-id=1096-3156` (List item variations: leading/trailing icons)

### O que foi implementado

- Extração da seção **Dropdowns** para Markdown estruturado com:
  - Anatomia (trigger, painel, list item)
  - Variantes de trigger (Basic, Person icon, Avatar, Status dot, Search)
  - Variantes de menu (plain, icons, checkboxes, shortcuts, header)
  - Tipos de list item (plain, radio, checkbox)
  - Estados (default, hover, selected, disabled, focused/open)
  - Header de perfil (avatar, nome, email, status dot)
  - Menu items e atalhos de teclado
  - Tokens de cor, tipografia e sombra
  - CSS e comportamento

### Arquivos gerados/alterados

- `src/assets/design_system/Dropdowns-design.md`
