# Logo — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — `https://www.figma.com/design/lFeZSZBobWcecy8SG2fwZQ/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system--Community---Copy---Community-?node-id=1294-160471&m=dev`  
> **Node:** `1294:160471` (frame **Logo**)  
> **Status:** Draft

## Visão Geral

O logotipo do Untitled UI é composto por formas abstratas em tons de roxo (Primary), criando uma identidade visual minimalista e moderna.

## Anatomia

### Logomark (símbolo)

- **Formas:** Duas figuras losango/diamante estilizadas, com cantos levemente arredondados, sobrepostas.
- **Disposição:** A forma roxa mais escura (superior/esquerda) sobrepõe a forma roxa mais clara (inferior/direita), criando profundidade.
- **Estilo:** Bordas suaves, aspecto orgânico, sem ângulos retos.

### Cores utilizadas

| Token | HEX | Uso no logo |
|-------|-----|-------------|
| Primary/500 | #9E77ED | Forma inferior/direita (roxo mais claro) |
| Primary/700 | #6941C6 | Forma superior/esquerda (roxo mais escuro) |

## Variantes de fundo

| Contexto | Fundo | Observação |
|----------|-------|------------|
| Light | Branco / cinza muito claro | Contraste com os tons de roxo |
| Dark | Preto | Formas em roxo sobre fundo escuro |

## Tokens / Variáveis

```json
{
  "Primary/500": "#9E77ED",
  "Primary/700": "#6941C6"
}
```

## Código Pronto para Uso

### CSS Custom Properties

```css
:root {
  --logo-primary-light: #9E77ED;
  --logo-primary-dark: #6941C6;
}
```

### Uso com SVG (referência)

O logomark pode ser exportado como SVG e as cores aplicadas via `fill` ou `currentColor`:

```css
.logomark {
  color: var(--logo-primary-dark);
}
.logomark-shape-light {
  fill: var(--logo-primary-light);
}
.logomark-shape-dark {
  fill: var(--logo-primary-dark);
}
```

## Uso e Diretrizes

- **Clear space:** Manter área de respiro ao redor do logo conforme especificado no Figma.
- **Tamanhos mínimos:** Respeitar o tamanho mínimo de exibição para legibilidade.
- **Cores:** Usar exclusivamente Primary/500 e Primary/700 para manter consistência da marca.

## Notas e Observações

- As variáveis `Primary/500` e `Primary/700` são compartilhadas com a paleta de cores do design system (ver `Colors-design.md`).
- O logomark pode ser usado isolado (ícone) ou combinado com o logotype "Untitled UI".
