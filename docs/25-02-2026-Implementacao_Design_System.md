# 25/02/2026 - Implementação Design System

## O que foi implementado

Implementação de um design system global baseado nos arquivos em `src/assets/design_system/` (Untitled UI — Figma). Variáveis CSS globais foram configuradas e integradas ao shadcn/ui e Tailwind v4.

### Arquivos criados/alterados

1. **src/styles/design-system.css** (novo)
   - Tokens de cores: Gray, Primary, Error, Warning, Success, White, Blue
   - Sombras: xs, sm, md, lg, xl, 2xl, 3xl e focus rings
   - Tipografia: Display (2xl–xs), Text (xl–xs) com Inter
   - Spacing: grid 4pt (1–20)
   - Border radius: sm, md, lg, xl, full
   - Gradientes: Gray e Primary

2. **src/index.css**
   - Import de `./styles/design-system.css`
   - Mapeamento das variáveis shadcn para tokens do design system
   - Light mode e dark mode usando tokens Gray/Primary
   - Chart colors e sidebar usando tokens do design system
   - `font-family: var(--font-family)` no body

3. **index.html**
   - Google Fonts: Inter (preconnect + link)

### Tokens disponíveis

| Categoria | Exemplos |
|-----------|----------|
| Cores | `--color-gray-*`, `--color-primary-*`, `--color-error-*`, `--color-warning-*`, `--color-success-*`, `--color-blue-*` |
| Sombras | `--shadow-xs` até `--shadow-3xl`, `--focus-ring-primary`, `--focus-ring-error`, `--focus-ring-gray` |
| Tipografia | `--font-family`, `--font-display-*`, `--font-text-*` |
| Spacing | `--spacing-1` até `--spacing-20` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| Gradientes | `--gradient-gray-*`, `--gradient-primary-*` |

### Uso no código

```css
/* Exemplo: usar token de cor */
.my-element {
  background: var(--color-primary-600);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-md);
}
```

```tsx
// Exemplo: classes Tailwind já mapeadas para o design system
<Button className="bg-primary text-primary-foreground">Ação</Button>
```

### Referências

- Documentação do design system: `src/assets/design_system/*.md`
- Cores, tipografia, sombras, botões, inputs, badges, etc.
