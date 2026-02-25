## Extração — Design System (Icons)

> **Data:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — múltiplos nodes  
> **Links:**
> - `node-id=1027-7346` (Outline icons grid)
> - `node-id=1102-5338` (Status icons com variantes)
> - `node-id=1254-137887` (Checkmark variants)
> - `node-id=1345-1610` (Checkmark em listas)
> - `node-id=1232-9` (Star rating)

### O que foi implementado

- Extração da seção **Icons** para Markdown estruturado com:
  - Biblioteca principal (~120 outline icons) e categorias
  - Tamanhos (xs a xl)
  - Variantes de estilo (glow, solid circle, solid rounded square, standalone)
  - Paletas de cor para ícones de status (Primary, Error, Warning, Success, Neutral)
  - Checkmark em 3 variantes (Purple, Gray, Green)
  - Star rating (estados empty a full)
  - Tokens CSS e diretrizes de uso

### Arquivos gerados/alterados

- `src/assets/design_system/Icons-design.md`

### Observações

- As cores são compartilhadas com `Colors-design.md`.
