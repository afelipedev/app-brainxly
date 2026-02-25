# Avatars — Design System

> **Extraído em:** 25/02/2026  
> **Fonte:** Figma (Dev Mode) — Untitled UI  
> **Nodes:** `933:30268`, `19:1038`, `1036:4`, `1102:4864`, `19:1012`, `1274:812`, `82:2793`, `1217:108477`  
> **Status:** Draft

## Visão Geral

Componente Avatar para representar usuários: imagem, ícone genérico ou iniciais. Inclui indicadores de status, grupos sobrepostos e variante "Add user".

## Tipos de Conteúdo

| Tipo | Descrição | Background |
|------|------------|------------|
| **Image** | Foto do usuário | — |
| **Icon** | Ícone genérico (person outline) | Primary/50 #F9F5FF |
| **Text** | Iniciais (ex.: "OR") | Primary/50 #F9F5FF |

## Tamanhos

| Tamanho | Uso |
|---------|-----|
| **xs** | Status, ícones inline |
| **sm** | Listas, chips |
| **md** | Padrão em cards e headers |
| **lg** | Perfil destacado |
| **xl** | Hero, páginas de perfil |
| **2xl** | Destaque máximo |

*6 escalas distintas documentadas no grid.*

## Status Indicators

| Status | Cor | Token | Posição |
|--------|-----|-------|---------|
| **Online/Active** | Verde | Success/500 #12B76A | Bottom-right |
| **Offline/Inactive** | Roxo | Primary/600 #7F56D9 | Bottom-right |
| **Nenhum** | — | — | — |

## Variantes de Borda

| Variante | Border |
|----------|--------|
| **Default** | Sem borda |
| **Bordered** | Borda fina Primary/100 (#F4EBFF) ou similar |

## Avatar com Nome e Email

- **Layout**: avatar circular + nome + email
- **Nome**: Text xl/Medium a Text xs/Medium (conforme tamanho)
- **Email**: Text sm/Regular ou Text xs/Regular, Gray/500
- **Source link**: texto "Source" + ícone de link (Gray/500)

## Avatar "Add user"

- **Ícone**: + (plus) centralizado
- **Border**: tracejada, Gray/300 (#D0D5DD)
- **Background**: White
- **Tooltip**: "Add user" (hover)
- **Estados**: default (borda cinza), hover (sombra sutil)

## Avatar Group (grupos sobrepostos)

- **Arranjo**: horizontal, sobreposição da direita para a esquerda
- **Visíveis**: até 8 avatares antes de truncar
- **Indicador "+N"**: círculo com fundo Primary/50, texto branco "+5" (exemplo)
- **Botão Add**: círculo com borda tracejada e ícone +

## Tokens Utilizados

### Cores

| Token | HEX | Uso |
|-------|-----|-----|
| White | #FFFFFF | Background avatar Add, texto +N |
| Gray/300 | #D0D5DD | Border tracejada Add user |
| Gray/400 | #98A2B3 | Texto secundário |
| Primary/50 | #F9F5FF | Background icon/text avatar, +N |
| Primary/100 | #F4EBFF | Border, focus ring |
| Primary/600 | #7F56D9 | Iniciais, ícone, status offline |
| Success/500 | #12B76A | Status online (dot verde) |

### Tipografia

| Token | Uso |
|-------|-----|
| Text xs/Medium | Nome (avatar xs) |
| Text sm/Medium | Nome (avatar sm/md) |
| Text md/Medium | Nome (avatar lg) |
| Text lg/Medium | Nome (avatar xl) |
| Text xl/Medium | Nome (avatar 2xl) |
| Display xs/Medium | Nome (avatar grande) |

### Sombras

| Token | Uso |
|-------|-----|
| Shadow sutil | Avatar com elevação |
| Focus ring/4px primary-100 | Avatar focável |

## Anatomia

- **Container**: círculo (border-radius: 50%)
- **Conteúdo**: imagem (object-fit: cover), ícone ou texto centralizado
- **Status dot**: círculo pequeno, bottom-right, sobrepondo a borda do avatar

## Código Pronto para Uso

```css
.avatar {
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #F9F5FF;
  color: #7F56D9;
  font-family: "Inter", sans-serif;
  font-weight: 500;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  border: 2px solid white;
}
.avatar-status-online {
  background: #12B76A;
}
.avatar-status-offline {
  background: #7F56D9;
}
.avatar-add {
  border: 2px dashed #D0D5DD;
  background: white;
  cursor: pointer;
}
.avatar-group {
  display: flex;
}
.avatar-group .avatar {
  margin-left: -8px;
}
.avatar-group .avatar:first-child {
  margin-left: 0;
}
.avatar-more {
  background: #F9F5FF;
  color: white;
  font-size: 12px;
}
```

## Comportamento

- **Add user**: clique abre modal ou ação de adicionar membro
- **Avatar group**: "+N" pode ser clicável para expandir lista
- **Tooltip**: "Add user" no hover do avatar Add

## Notas e Observações

- Avatares de exemplo: Olivia Rhye, Alisa Hester, Phoenix Baker, Lana Steiner, Demi Wilkinson, Candice Wu, Natali Craig, Drew Cano, Orlando Diggs, Andi Lane, Kate Morrison.
- Iniciais padrão: "OR" (Olivia Rhye).
- Referência de cores em `Colors-design.md`.
