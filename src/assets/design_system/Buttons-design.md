# Buttons — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `1037:37979`, `1038:34411`, `1532:357717`  
> **Status:** Draft

## Visão Geral

Componente de botão com variantes de estilo, tamanho e estado. Segue princípios de hierarquia visual e tratamento de ações destrutivas.

## Princípios de Design

### 1. Buttons should look like buttons

Botões são elementos interativos e devem comunicar visualmente sua função. Retângulos ou retângulos arredondados são sempre uma escolha segura. Evitar alterar demais a aparência para não perder a qualidade de ação.

### 2. Don't forget hierarchy

Organizar ações em hierarquia clara: Primary, Secondary, Tertiary e até Quaternary. A ação primária deve ser a opção padrão e mais óbvia.

**Exemplo de hierarquia (workflow de publicação):**
- **Cancel** — Tertiary (fundo branco, borda cinza)
- **Save as draft** — Secondary (fundo branco, borda roxa)
- **Stage for publish** — Secondary (fundo branco, borda roxa)
- **✓ Publish now** — Primary (fundo roxo sólido, texto branco)

### 3. Destructive actions

Ações destrutivas nem sempre precisam ser um "grande botão vermelho". Na maioria dos casos, um botão secondary é suficiente. Se a ação destrutiva for a primária ou altamente consequente, usar a variante **destructive**.

**Exemplos:**
- **Modal "Unsaved changes"**: "Discard" (vermelho) + "Save changes" (roxo primário)
- **Modal "Delete blog post"**: "Cancel" (cinza) + "Delete" (vermelho sólido, ação primária destrutiva)

## Variantes

| Variante | Descrição | Background | Border | Text |
|----------|------------|------------|--------|------|
| **Primary** | Ação principal | Primary/600 (#7F56D9) | — | White |
| **Primary (hover)** | — | Primary/700 (#6941C6) | — | White |
| **Primary (active)** | — | Primary/800 (#53389E) | — | White |
| **Secondary** | Ação secundária | White / Primary/50 | Primary/200 | Primary/700 |
| **Secondary (hover)** | — | Primary/50 | Primary/300 | Primary/700 |
| **Tertiary** | Ação terciária | Transparent | Gray/300 | Gray/700 |
| **Tertiary (hover)** | — | Gray/50 | Gray/300 | Gray/700 |
| **Destructive Primary** | Ação destrutiva principal | Error/600 (#D92D20) | — | White |
| **Destructive Primary (hover)** | — | Error/700 (#B42318) | — | White |
| **Destructive Secondary** | Ação destrutiva secundária | White / Error/50 | Error/200 | Error/700 |
| **Destructive Secondary (hover)** | — | Error/50 | Error/300 | Error/700 |

## Estados

| Estado | Descrição |
|--------|-----------|
| **Default** | Aparência padrão |
| **Hover** | Cor alterada ao passar o mouse |
| **Active** | Cor mais escura ao clicar |
| **Focus** | Ring de foco (4px Primary/100, Error/100 ou Gray/100) |
| **Disabled** | Opacidade reduzida, interação desabilitada |

## Tamanhos

| Tamanho | Altura | Typography | Padding horizontal |
|---------|--------|------------|-------------------|
| **Small** | — | Text sm/Semibold (14px) | — |
| **Medium** | — | Text md/Semibold (16px) | — |
| **Large** | — | Text lg/Semibold (18px) | — |

## Conteúdo

| Tipo | Descrição |
|------|------------|
| **Text only** | Apenas label (ex.: "Button CTA") |
| **Left icon** | Ícone à esquerda + texto |
| **Right icon** | Texto + ícone à direita |
| **Icon only** | Apenas ícone (quadrado) |

## Tokens Utilizados

### Cores

| Token | HEX | Uso |
|-------|-----|-----|
| Primary/600 | #7F56D9 | Background Primary default |
| Primary/700 | #6941C6 | Background Primary hover |
| Primary/800 | #53389E | Background Primary active |
| Primary/50 | #F9F5FF | Background Secondary |
| Primary/100 | #F4EBFF | Focus ring Primary |
| Primary/200 | #E9D7FE | Border Secondary |
| Primary/300 | #D6BBFB | Border Secondary hover |
| Error/600 | #D92D20 | Background Destructive Primary |
| Error/700 | #B42318 | Background Destructive Primary hover |
| Error/50 | #FEF3F2 | Background Destructive Secondary |
| Error/100 | #FEE4E2 | Focus ring Destructive |
| Error/200 | #FECDCA | Border Destructive Secondary |
| Error/300 | #FDA29B | Border Destructive Secondary hover |
| Gray/50 | #F9FAFB | Background Tertiary hover |
| Gray/100 | #F2F4F7 | Focus ring Tertiary |
| Gray/200 | #EAECF0 | — |
| Gray/300 | #D0D5DD | Border Tertiary |
| Gray/700 | #344054 | Text Tertiary |
| White | #FFFFFF | Text em botões filled |

### Sombras

| Token | Uso |
|-------|-----|
| Shadow/xs | Sombra padrão do botão |
| Shadow/xs focused 4px primary-100 | Focus ring Primary (spread 4px, Primary/100) |
| Shadow/xs focused 4px error-100 | Focus ring Destructive |
| Shadow/xs focused 4px gray-100 | Focus ring Tertiary |

### Tipografia

| Token | Uso |
|-------|-----|
| Text sm/Semibold | Small |
| Text md/Semibold | Medium |
| Text lg/Semibold | Large |
| Text lg/Medium | Algumas variantes secondary |

## Anatomia

- **Container**: retângulo com border-radius, padding, box-shadow (xs)
- **Label**: texto centralizado, semibold
- **Icon** (opcional): 16px ou 20px, alinhado à esquerda ou direita do texto
- **Focus ring**: outline ou box-shadow com spread 4px (cor conforme variante)

## Código Pronto para Uso

### CSS (exemplo Primary)

```css
.btn-primary {
  background-color: #7F56D9;
  color: #FFFFFF;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.btn-primary:hover {
  background-color: #6941C6;
}
.btn-primary:focus {
  box-shadow: 0 0 0 4px rgba(244, 235, 255, 1), 0px 1px 2px 0px rgba(16, 24, 40, 0.051);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Focus ring (custom properties)

```css
:root {
  --focus-ring-primary: 0 0 0 4px #F4EBFF;
  --focus-ring-error: 0 0 0 4px #FEE4E2;
  --focus-ring-gray: 0 0 0 4px #F2F4F7;
}
```

## Comportamento

- **Click**: feedback visual (active state) e execução da ação
- **Keyboard**: acessível via Tab e Enter/Space
- **Disabled**: não responde a interações

## Notas e Observações

- Border-radius consistente em todos os botões.
- Icon-only: proporção quadrada, ícone centralizado.
- Referência de cores em `Colors-design.md`, sombras em `Shadows-design.md`.
