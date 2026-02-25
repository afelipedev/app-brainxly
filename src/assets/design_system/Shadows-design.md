# Shadows — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — `https://www.figma.com/design/lFeZSZBobWcecy8SG2fwZQ/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system--Community---Copy---Community-?node-id=1532-352912&m=dev`  
> **Node:** `1532:352912` (frame **Shadows**)  
> **Status:** Draft

## Visão Geral

**Foundations -> Shadows & blurs**

**Shadows**

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.

## Resources

- [Create color, text, effect and layout grid styles ->](https://help.figma.com/hc/en-us/articles/360038746534-Create-color-text-effect-and-layout-grid-styles)
- [Figma Tutorial: Creating Styles ->](https://www.youtube.com/watch?v=gtQ_A3imzsg)

## Tokens / Variáveis

| Token | box-shadow | Uso |
|-------|------------|-----|
| Shadow/xs | `0px 1px 2px 0px rgba(16, 24, 40, 0.051)` | Elevação mínima, bordas sutis |
| Shadow/sm | `0px 1px 2px 0px rgba(16, 24, 40, 0.059), 0px 1px 3px 0px rgba(16, 24, 40, 0.102)` | Cards, inputs, elementos levemente elevados |
| Shadow/md | `0px 2px 4px -2px rgba(16, 24, 40, 0.059), 0px 4px 8px -2px rgba(16, 24, 40, 0.102)` | Dropdowns, popovers |
| Shadow/lg | `0px 4px 6px -2px rgba(16, 24, 40, 0.031), 0px 12px 16px -4px rgba(16, 24, 40, 0.078)` | Modais, drawers |
| Shadow/xl | `0px 8px 8px -4px rgba(16, 24, 40, 0.031), 0px 20px 24px -4px rgba(16, 24, 40, 0.078)` | Elementos com destaque elevado |
| Shadow/2xl | `0px 24px 48px -12px rgba(16, 24, 40, 0.180)` | Overlays, dialogs grandes |
| Shadow/3xl | `0px 32px 64px -12px rgba(16, 24, 40, 0.141)` | Máxima elevação, hero elements |

## Valores brutos (Figma)

| Token | Color (hex+alpha) | Offset (x, y) | Radius | Spread |
|-------|-------------------|---------------|--------|--------|
| Shadow/xs | #1018280D | (0, 1) | 2 | 0 |
| Shadow/sm | #1018280F, #1018281A | (0, 1), (0, 1) | 2, 3 | 0, 0 |
| Shadow/md | #1018280F, #1018281A | (0, 2), (0, 4) | 4, 8 | -2, -2 |
| Shadow/lg | #10182808, #10182814 | (0, 4), (0, 12) | 6, 16 | -2, -4 |
| Shadow/xl | #10182808, #10182814 | (0, 8), (0, 20) | 8, 24 | -4, -4 |
| Shadow/2xl | #1018282E | (0, 24) | 48 | -12 |
| Shadow/3xl | #10182824 | (0, 32) | 64 | -12 |

## Código Pronto para Uso

### CSS Custom Properties

```css
:root {
  --shadow-xs: 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
  --shadow-sm: 0px 1px 2px 0px rgba(16, 24, 40, 0.059), 0px 1px 3px 0px rgba(16, 24, 40, 0.102);
  --shadow-md: 0px 2px 4px -2px rgba(16, 24, 40, 0.059), 0px 4px 8px -2px rgba(16, 24, 40, 0.102);
  --shadow-lg: 0px 4px 6px -2px rgba(16, 24, 40, 0.031), 0px 12px 16px -4px rgba(16, 24, 40, 0.078);
  --shadow-xl: 0px 8px 8px -4px rgba(16, 24, 40, 0.031), 0px 20px 24px -4px rgba(16, 24, 40, 0.078);
  --shadow-2xl: 0px 24px 48px -12px rgba(16, 24, 40, 0.180);
  --shadow-3xl: 0px 32px 64px -12px rgba(16, 24, 40, 0.141);
}
```

### Uso

```css
.card {
  box-shadow: var(--shadow-sm);
}
.modal {
  box-shadow: var(--shadow-lg);
}
```

## Uso e Diretrizes

- **xs**: bordas quase imperceptíveis; use em hover sutil ou separadores.
- **sm**: elevação leve; cards, inputs, botões.
- **md**: elevação moderada; dropdowns, popovers, tooltips.
- **lg**: elevação alta; modais, drawers, sidebars.
- **xl**: destaque forte; CTAs, elementos flutuantes.
- **2xl / 3xl**: máxima profundidade; overlays, dialogs fullscreen.

## Notas e Observações

- Todas as sombras usam a cor base **Gray/900** (#101828) com opacidades variadas.
- As sombras **sm** a **xl** utilizam duas camadas (dois `box-shadow`) para maior realismo.
- **Footer visível no frame**:
  - "The ultimate Figma UI kit and design system"
  - `www.untitledui.com`
  - "© 2023 Untitled UI"
