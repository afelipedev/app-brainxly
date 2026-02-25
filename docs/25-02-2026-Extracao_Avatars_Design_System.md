## Extração — Design System (Avatars)

> **Data:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — múltiplos nodes  
> **Links:**
> - `node-id=933-30268` (Avatar com nome e source link)
> - `node-id=19-1038` (Círculos de tamanho/status: gray, green)
> - `node-id=1036-4` (7 tamanhos de avatar)
> - `node-id=1102-4864` (Add user avatar: tooltip, estados)
> - `node-id=19-1012` (Grid: 6 tamanhos x 3 tipos x 3 status)
> - `node-id=1274-812` (Avatar groups: sobrepostos, +N, Add)
> - `node-id=82-2793` (Avatar com border e status: green, purple)
> - `node-id=1217-108477` (Image, Icon, Text avatars com shadow)

### O que foi implementado

- Extração da seção **Avatars** para Markdown estruturado com:
  - Tipos de conteúdo (Image, Icon, Text/initials)
  - 6 tamanhos (xs a 2xl)
  - Status indicators (online/verde, offline/roxo)
  - Variantes de borda
  - Avatar com nome e email
  - Avatar "Add user" (borda tracejada, tooltip)
  - Avatar groups (sobreposição, +N, Add button)
  - Tokens de cor e tipografia
  - CSS e comportamento

### Arquivos gerados/alterados

- `src/assets/design_system/Avatars-design.md`
