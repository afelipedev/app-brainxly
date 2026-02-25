# Inputs — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `1090:57817`, `1238:278`  
> **Status:** Draft

## Visão Geral

Componentes de input (texto, email, phone, etc.) e textarea com label, placeholder, helper text, prefix/suffix e estados (default, focused, error).

## Tipos de Input

| Tipo | Label | Placeholder/Exemplo | Prefix | Suffix |
|------|-------|-------------------|--------|--------|
| **Email** | Email | olivia@untitledui.com | @ | info (i) ou ícone de validação |
| **Phone** | Phone number | +1 (555) 808-8080 | Dropdown (US + seta) | — |
| **Sale Amount** | Sale amount | $ 1,080.00 | — | Dropdown (USD + seta) |
| **Website** | Website | http://www.untitledui.com | Globe icon | — |
| **Card Number** | Card number | Card number | — | Credit card icon |
| **Text** | Description | Enter a description... | — | — |
| **Textarea** | Description | A little about the company... | — | — |

## Estados

| Estado | Border | Helper Text |
|--------|--------|-------------|
| **Default** | Gray/300 #D0D5DD | — |
| **Focused** | Primary/300 #D6BBFB + focus ring 4px Primary/100 | — |
| **With Helper** | Default ou Focused | "This is a hint text to help user." (Gray/500) |
| **Error** | Error/300 #FDA29B | "This is an error message." (Error/500) |

## Anatomia

- **Label**: Text sm/Medium, Gray/700 (#344054)
- **Input/Textarea**: Text md/Regular, Gray/900 (#101828) para valor, Gray/400 (#98A2B3) para placeholder
- **Helper text**: Text sm/Regular, Gray/500 (#667085)
- **Error message**: Text sm/Regular, Error/500 (#F04438)
- **Border**: 1px, Gray/300 default; Primary/300 focused; Error/300 error
- **Background**: White (#FFFFFF)
- **Focus ring**: 4px spread, Primary/100 (#F4EBFF) ou Error/100 (#FEE4E2)

## Tokens Utilizados

### Cores

| Token | HEX | Uso |
|-------|-----|-----|
| Gray/50 | #F9FAFB | Background (alguns estados) |
| Gray/100 | #F2F4F7 | — |
| Gray/300 | #D0D5DD | Border default |
| Gray/400 | #98A2B3 | Placeholder |
| Gray/500 | #667085 | Helper text |
| Gray/700 | #344054 | Label |
| Gray/900 | #101828 | Texto do input |
| Primary/300 | #D6BBFB | Border focused |
| Primary/100 | #F4EBFF | Focus ring |
| Error/300 | #FDA29B | Border error |
| Error/500 | #F04438 | Error message |
| White | #FFFFFF | Background |

### Tipografia

| Token | Uso |
|-------|-----|
| Text sm/Medium | Label |
| Text sm/Regular | Helper text, error message |
| Text md/Regular | Valor do input |

### Sombras

| Token | Uso |
|-------|-----|
| Shadow/xs | Sombra do input |
| Shadow/xs focused 4px primary-100 | Focus ring (default) |
| Shadow/xs focused 4px error-100 | Focus ring (error) |

## Variantes de Layout

| Variante | Elementos |
|----------|-----------|
| **Input simples** | Apenas campo |
| **Com label** | Label acima do input |
| **Com helper text** | Texto de ajuda abaixo |
| **Com label + helper** | Label + input + helper |
| **Com prefix** | Ícone ou dropdown à esquerda |
| **Com suffix** | Ícone ou dropdown à direita |

## Código Pronto para Uso

```css
.input {
  width: 100%;
  padding: 10px 14px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #101828;
  background-color: #FFFFFF;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.input::placeholder {
  color: #98A2B3;
}
.input:focus {
  outline: none;
  border-color: #D6BBFB;
  box-shadow: 0 0 0 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.input.error {
  border-color: #FDA29B;
}
.input.error:focus {
  box-shadow: 0 0 0 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.input-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #344054;
  margin-bottom: 6px;
}
.input-helper {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #667085;
  margin-top: 6px;
}
.input-error {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #F04438;
  margin-top: 6px;
}
```

## Comportamento

- **Focus**: border e ring mudam ao receber foco
- **Error**: exibido quando validação falha; helper text substituído por error message
- **Disabled**: opacidade reduzida, não editável

## Notas e Observações

- Inputs com dropdown (Phone, Sale Amount) usam addon integrado.
- Textarea: altura variável, múltiplas linhas.
- Referência de cores em `Colors-design.md`, sombras em `Shadows-design.md`.
