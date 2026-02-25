# Gradients — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — `https://www.figma.com/design/lFeZSZBobWcecy8SG2fwZQ/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system--Community---Copy---Community-?node-id=1525-272676&m=dev`  
> **Node:** `1525:272676` (frame **Gradients**)  
> **Status:** Draft

## Visão Geral

**Foundations -> Colors**

**Gradients**

A gradient is the gradual blending from one color to another. Incorporating gradients into your designs is a great way to make objects stand out by adding a new dimension and adding realism to objects. They almost create a new color.

## Resources

- [Create color, text, effect and layout grid styles ->](https://help.figma.com/hc/en-us/articles/360038746534-Create-color-text-effect-and-layout-grid-styles)
- [Figma Tutorial: Creating Styles ->](https://www.youtube.com/watch?v=gtQ_A3imzsg)

## Tokens / Variáveis

### Primary colors

These are the main colors that make up the majority of the colors used in the design system.

#### Gray gradients

Gray is a neutral color and is the foundation of the color system. Almost everything in UI design — text, form fields, backgrounds, dividers — are usually gray.

##### Swatches (visíveis)

> Observação: o “swatch” é exibido como imagem no export de contexto; aqui estão os textos visíveis em cada card.

| Token (quando aplicável) | Esquerda (step/HEX) | Ângulo | Direita (step/HEX) |
|---|---|---:|---|
| — | 600 / #475467 | — | — |
| Gradient/Gray/600 -> 500 (90deg) | 600 / #475467 | 90deg | 500 / #667085 |
| Gradient/Gray/700 -> 600 (45deg) | 700 / #344054 | 45deg | 600 / #475467 |
| Gradient/Gray/800 -> 600 (45deg) | 800 / #1D2939 | 45deg | 600 / #475467 |
| Gradient/Gray/800 -> 600 (90deg) | 800 / #1D2939 | 90deg | 600 / #475467 |
| Gradient/Gray/800 -> 700 (26.5deg) | 800 / #1D2939 | 26.5deg | 700 / #344054 |
| Gradient/Gray/900 -> 600 (45deg) | 900 / #101828 | 45deg | 600 / #475467 |

#### Primary gradients

The primary color is your "brand" color, and is used across all interactive elements such as buttons, links, inputs, etc. This color can define the overall feel and can elicit emotion.

##### Swatches (visíveis)

| Token (quando aplicável) | Esquerda (step/HEX) | Ângulo | Direita (step/HEX) |
|---|---|---:|---|
| — | 600 / #7F56D9 | — | — |
| Gradient/Primary/600 -> 500 (90deg) | 600 / #7F56D9 | 90deg | 500 / #000000 |
| Gradient/Primary/700 -> 600 (45deg) | 700 / #6941C6 | 45deg | 600 / #7F56D9 |
| Gradient/Primary/800 -> 600 (45deg) | 800 / #53389E | 45deg | 600 / #000000 |
| Gradient/Primary/800 -> 600 (90deg) | 800 / #53389E | 90deg | 600 / #7F56D9 |
| Gradient/Primary/800 -> 700 (26.5deg) | 800 / #53389E | 26.5deg | 700 / #6941C6 |
| Gradient/Primary/900 -> 600 (45deg) | 900 / #42307D | 45deg | 600 / #7F56D9 |

## Uso e Diretrizes

- Os gradients são organizados por família (Gray / Primary) e exibem, em cada card, os steps e HEX das cores e o ângulo (quando existe).

## Código Pronto para Uso

> Como o layout mostra somente 2 cores + ângulo por gradient, abaixo estão equivalentes em CSS com `linear-gradient(angle, left, right)`.

```css
:root {
  /* Gray gradients */
  --gradient-gray-600-500-90deg: linear-gradient(90deg, #475467, #667085);
  --gradient-gray-700-600-45deg: linear-gradient(45deg, #344054, #475467);
  --gradient-gray-800-600-45deg: linear-gradient(45deg, #1D2939, #475467);
  --gradient-gray-800-600-90deg: linear-gradient(90deg, #1D2939, #475467);
  --gradient-gray-800-700-26_5deg: linear-gradient(26.5deg, #1D2939, #344054);
  --gradient-gray-900-600-45deg: linear-gradient(45deg, #101828, #475467);

  /* Primary gradients */
  --gradient-primary-600-500-90deg: linear-gradient(90deg, #7F56D9, #000000);
  --gradient-primary-700-600-45deg: linear-gradient(45deg, #6941C6, #7F56D9);
  --gradient-primary-800-600-45deg: linear-gradient(45deg, #53389E, #000000);
  --gradient-primary-800-600-90deg: linear-gradient(90deg, #53389E, #7F56D9);
  --gradient-primary-800-700-26_5deg: linear-gradient(26.5deg, #53389E, #6941C6);
  --gradient-primary-900-600-45deg: linear-gradient(45deg, #42307D, #7F56D9);
}
```

## Notas e Observações

- O breadcrumb visível no header do frame está como **“Foundations -> Colors”**.
- Existem 2 cards iniciais (Gray e Primary) que exibem apenas `600 / HEX` sem ângulo/segunda cor.
- No layout, alguns cards exibem `#000000` como HEX da cor “Direita” (ver tabela de **Primary gradients**).
- **Footer visível no frame**:
  - “The ultimate Figma UI kit and design system”
  - `www.untitledui.com`
  - “© 2023 Untitled UI”

