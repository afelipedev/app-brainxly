# Badges — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `1046:3819`, `1046:8088`  
> **Status:** Draft

## Visão Geral

Componente Badge para labels, status e tags. Pode incluir ícones, dot ou ações (close, add). Disponível em múltiplas paletas de cor.

## Variantes de Conteúdo

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Plain Label** | Apenas texto | Label |
| **Dot Prefix** | Dot + texto | • Label |
| **Icon Prefix** | Ícone à esquerda + texto | 🌎 Label, 👨 Label |
| **Close Suffix** | Texto + ícone X (removível) | Label × |
| **Plus Suffix** | Texto + ícone + | Label + |
| **Plus Prefix** | Ícone + + texto | + Label |
| **Standalone Plus** | Apenas ícone + | + |

## Paletas de Cor (Background / Text)

| Contexto | Background | Text/Icon |
|----------|------------|-----------|
| **Primary** | Primary/50 #F9F5FF | Primary/700 #6941C6 |
| **Pink** | Pink/50 #FDF2FA | Pink/700 #C11574 |
| **Error** | Error/50 #FEF3F2 | Error/700 #B42318 |
| **Warning** | Warning/50 #FFFAEB | Warning/700 #B54708 |
| **Success** | Success/50 #ECFDF3 | Success/700 #027A48 |
| **Blue light** | Blue light/50 #F0F9FF | Blue light/700 #026AA2 |
| **Blue** | Blue/50 #EFF8FF | Blue/700 #175CD3 |
| **Indigo** | Indigo/50 #EEF4FF | Indigo/700 #3538CD |
| **Purple** | Purple/50 #F4F3FF | Purple/700 #5925DC |
| **Blue gray** | Blue gray/50 #F8F9FC | Blue gray/700 #363F72 |
| **Rosé** | Rosé/50 #FFF1F3 | Rosé/700 #C01048 |
| **Orange** | Orange/50 #FFF6ED | Orange/700 #C4320A |
| **Gray** | Gray/100 #F2F4F7 | Gray/700 #344054 |

## Badges de Status (Alertas)

### New feature

| Estilo | Descrição |
|--------|-----------|
| **Solid** | "New feature" + "We've just released a new feature" — fundo roxo/cinza |
| **Mixed** | Segmento "New feature" sólido + resto outline ou fundo claro |
| **Outline** | Borda roxa/cinza, fundo branco |
| **Interactive** | Ícone seta → no final (ação clicável) |

### Error

| Estilo | Descrição |
|--------|-----------|
| **Solid** | Fundo vermelho, texto branco |
| **Light** | Fundo vermelho claro, texto vermelho escuro |
| **Outline** | Borda vermelha, fundo branco |
| **Action** | Segmento "Fix now" com fundo vermelho escuro (ação) |
| **Interactive** | Ícone seta → |

### Warning

| Estilo | Descrição |
|--------|-----------|
| **Solid** | Fundo amarelo/laranja |
| **Light** | Fundo amarelo claro |
| **Outline** | Borda amarela/laranja |
| **Action** | Segmento "Warning" destacado |
| **Interactive** | Ícone seta → |

### Success

| Estilo | Descrição |
|--------|-----------|
| **Solid** | Fundo verde |
| **Light** | Fundo verde claro |
| **Outline** | Borda verde |
| **Action** | Segmento "Success" destacado |
| **Interactive** | Ícone seta → |

## Tokens Utilizados

### Tipografia

| Token | Uso |
|-------|-----|
| Text xs/Medium | Label do badge |
| Text sm/Medium | Labels maiores em badges de status |

### Cores (referência em Colors-design.md)

- Primary, Error, Warning, Success, Blue, Indigo, Purple, Pink, Rosé, Orange, Blue gray, Blue light, Gray

## Anatomia

- **Container**: retângulo arredondado (pill/capsule)
- **Label**: texto centralizado, Medium weight
- **Dot** (opcional): círculo pequeno antes do texto
- **Icon** (opcional): à esquerda ou direita do texto
- **Close/Plus** (opcional): ícone clicável para remover ou adicionar

## Código Pronto para Uso

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: 9999px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}
.badge-primary {
  background-color: #F9F5FF;
  color: #6941C6;
}
.badge-error {
  background-color: #FEF3F2;
  color: #B42318;
}
.badge-success {
  background-color: #ECFDF3;
  color: #027A48;
}
.badge-warning {
  background-color: #FFFAEB;
  color: #B54708;
}
.badge-gray {
  background-color: #F2F4F7;
  color: #344054;
}
```

## Comportamento

- **Removível**: badge com ícone X — ao clicar, remove o badge
- **Adicionável**: badge com ícone + — ao clicar, adiciona ou expande
- **Interativo**: badge com seta → — navega ou executa ação

## Notas e Observações

- Formato pill (border-radius alto) em todos os badges.
- Badges de status podem ter segmentos distintos (ex.: "Error" sólido + "Fix now" como botão).
