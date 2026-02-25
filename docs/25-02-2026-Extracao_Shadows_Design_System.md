## Extração — Design System (Shadows)

> **Data:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — `1532:352912`  
> **Link:** `https://www.figma.com/design/lFeZSZBobWcecy8SG2fwZQ/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system--Community---Copy---Community-?node-id=1532-352912&m=dev`

### O que foi implementado

- Extração da seção **Shadows** (Foundations -> Shadows & blurs) para Markdown estruturado com:
  - Textos visíveis do topo (breadcrumb, título, descrição) e links de **Resources**
  - Todos os tokens (xs, sm, md, lg, xl, 2xl, 3xl) com valores exatos do Figma
  - Tabela com `box-shadow` em CSS pronto para uso
  - Tabela com valores brutos (color, offset, radius, spread)
  - Bloco de **CSS Custom Properties** e diretrizes de uso

### Arquivos gerados/alterados

- `src/assets/design_system/Shadows-design.md`

### Observações

- As sombras usam Gray/900 (#101828) como cor base com opacidades variadas.
- sm a xl utilizam duas camadas de sombra.
