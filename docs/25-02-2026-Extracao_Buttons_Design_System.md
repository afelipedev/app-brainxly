## Extração — Design System (Buttons)

> **Data:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — múltiplos nodes  
> **Links:**
> - `node-id=1037-37979` (Primary buttons, variantes de conteúdo)
> - `node-id=1038-34411` (Grid completo: Primary, Secondary, Tertiary, Destructive, estados)
> - `node-id=1532-357717` (Diretrizes e princípios de design)

### O que foi implementado

- Extração da seção **Buttons** para Markdown estruturado com:
  - Princípios de design (aparência, hierarquia, ações destrutivas)
  - Variantes (Primary, Secondary, Tertiary, Destructive Primary/Secondary)
  - Estados (Default, Hover, Active, Focus, Disabled)
  - Tamanhos (Small, Medium, Large)
  - Tipos de conteúdo (text only, left/right icon, icon only)
  - Tokens de cor, sombra e tipografia
  - Anatomia, CSS de exemplo e comportamento

### Arquivos gerados/alterados

- `src/assets/design_system/Buttons-design.md`

### Observações

- Focus ring usa spread 4px com Primary/100, Error/100 ou Gray/100.
