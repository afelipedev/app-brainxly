# Icons — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `1027:7346`, `1102:5338`, `1254:137887`, `1345:1610`, `1232:9`  
> **Status:** Draft

## Visão Geral

O sistema de ícones do Untitled UI inclui uma biblioteca de outline icons monocromáticos, ícones de status/feedback com variantes de cor e background, e ícones especiais (checkmark, star rating).

## Biblioteca

| Atributo | Valor |
|----------|-------|
| Estilo | Outline (linha) |
| Tipo | Custom (Untitled UI) |
| Contagem | ~120 ícones únicos |
| Peso de linha | Consistente em todo o set |

## Tamanhos

| Tamanho | px | Uso típico |
|---------|-----|------------|
| xs | 16 | Inline com texto pequeno |
| sm | 20 | Botões, labels |
| md | 24 | Navegação, ações principais |
| lg | 32 | Headers, destaque |
| xl | 48 | Hero, CTAs grandes |

## Categorias de Ícones (Outline Set)

| Categoria | Exemplos |
|-----------|----------|
| **Conectividade** | Wi-Fi, Bluetooth, cloud (upload/download), network |
| **Mídia** | Play, pause, stop, volume, câmera, vídeo, microfone |
| **Navegação** | Setas, home, anchor, map, location pin |
| **Ações UI** | Plus, minus, edit, delete, cut, copy, paste, share, download, upload, search, lock, unlock, settings, refresh, undo, favorite, star, bookmark |
| **Comunicação** | Email, chat, phone (call/hang up/blocked), @ |
| **Arquivos e dados** | Folder, file, database, save, clipboard, charts |
| **Tempo** | Clock, calendar |
| **Sistema e alertas** | Warning, info, bell (on/off), power, alert triangle |
| **Usuário** | User, users, user add, user remove, user settings |
| **Objetos** | Lightbulb, coffee, umbrella, rocket, cart, bag, eye |
| **Formatação** | Cursor, bold, italic, underline |
| **Outros** | Checkmarks, X, slider, crop, expand, minimize, fullscreen, menu (3 dots), shapes |

## Variantes de Estilo (Ícones com Background)

### 1. Glow / Shadow (fundo circular suave)

| Ícone | Glyph | Background | Uso |
|-------|-------|------------|-----|
| Lightning | Roxo claro | Lavender claro | Primary/ativo |
| Lightning | Cinza escuro | Cinza claro | Neutral |
| Exclamation Circle | Vermelho | Rosa claro | Error |
| Warning Triangle | Laranja | Amarelo-laranja claro | Warning |
| Checkmark Circle | Verde | Mint claro | Success |

### 2. Solid Circle (fundo circular sólido)

| Ícone | Glyph | Background | Token |
|-------|-------|------------|-------|
| Lightning | Branco | Roxo | Primary/600 #7F56D9 |
| Lightning | Branco | Cinza escuro | Gray/700 #344054 |
| Exclamation Circle | Branco | Vermelho | Error/500 #F04438 |
| Warning Triangle | Branco | Laranja | Warning/500 #F79009 |
| Checkmark Circle | Branco | Verde | Success/500 #12B76A |

### 3. Solid Rounded Square (fundo quadrado arredondado)

| Ícone | Glyph | Background | Token |
|-------|-------|------------|-------|
| Lightning | Roxo claro | Lavender | Primary/100 #F4EBFF |
| Lightning | Branco | Roxo escuro | Primary/800 #53389E |
| Lightning | Cinza escuro | Cinza claro | Gray/200 #EAECF0 |

### 4. Standalone (sem background)

| Ícone | Cor | Token |
|-------|-----|-------|
| Lightning | Cinza escuro | Gray/700 #344054 |

## Paletas para Ícones de Status

| Contexto | Glyph | Background | Tokens |
|----------|-------|------------|--------|
| Primary | Primary/500 | Primary/50 | #9E77ED, #F9F5FF |
| Error | Error/500 | Error/50 | #F04438, #FEF3F2 |
| Warning | Warning/500 | Warning/50 | #F79009, #FFFAEB |
| Success | Success/500 | Success/50 | #12B76A, #ECFDF3 |
| Neutral | Gray/600 | Gray/100 | #475467, #F2F4F7 |

## Checkmark Icons (variantes)

| Variante | Glyph | Background | Uso |
|----------|-------|------------|-----|
| Purple | Roxo médio | Lavender pastel | Primary/ativo |
| Gray | Cinza escuro | Cinza muito claro | Neutral/disabled |
| Green | Verde médio | Mint pastel | Success/completed |

Tamanhos: 6 escalas (xs a xl).

## Star Rating Icons

| Estado | Descrição | Cor |
|--------|-----------|-----|
| Empty | Contorno vazio | Cinza claro |
| 1/4 filled | Preenchimento parcial | Amarelo dourado |
| 1/2 filled | Meio preenchido | Amarelo dourado |
| 3/4 filled | Três quartos preenchido | Amarelo dourado |
| Full | Totalmente preenchido | Amarelo dourado |

## Tokens de Cor (referência)

```css
:root {
  /* Primary */
  --icon-primary: #9E77ED;
  --icon-primary-bg: #F9F5FF;
  --icon-primary-solid: #7F56D9;

  /* Error */
  --icon-error: #F04438;
  --icon-error-bg: #FEF3F2;

  /* Warning */
  --icon-warning: #F79009;
  --icon-warning-bg: #FFFAEB;

  /* Success */
  --icon-success: #12B76A;
  --icon-success-bg: #ECFDF3;

  /* Neutral */
  --icon-neutral: #475467;
  --icon-neutral-bg: #F2F4F7;
}
```

## Uso e Diretrizes

- **Outline icons**: usar para ações, navegação e elementos UI gerais. Cor padrão Gray/900 (#101828).
- **Status icons**: usar Lightning (primary), Exclamation (error), Warning (warning), Checkmark (success) conforme o contexto.
- **Checkmark em listas**: preferir variante Purple para itens de destaque, Green para itens concluídos.
- **Star rating**: usar para avaliações; suporta estados parciais (1/4, 1/2, 3/4, full).

## Notas e Observações

- Os ícones outline são monocromáticos; a cor é aplicada via `fill` ou `currentColor`.
- As variáveis de cor são compartilhadas com `Colors-design.md`.
- O node `1345:1610` demonstra o uso do checkmark em listas com o texto "All features and premium support".
