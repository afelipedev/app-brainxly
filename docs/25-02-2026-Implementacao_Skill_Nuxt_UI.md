# 25/02/2026 - Implementação Skill Nuxt UI

## O que foi implementado

Criação da skill **nuxt-ui** para Cursor, baseada no repositório oficial [nuxt/ui v4](https://github.com/nuxt/ui/tree/v4/skills/nuxt-ui).

### Estrutura criada

```
.cursor/skills/nuxt-ui/
├── SKILL.md                    # Instruções principais
└── references/
    ├── theming.md              # Cores semânticas, CSS utilities, customização de tema
    ├── composables.md         # useToast, useOverlay, defineShortcuts, i18n
    ├── components.md         # 125+ componentes por categoria
    └── layouts/
        ├── page.md           # Landing, blog, changelog, pricing
        ├── dashboard.md     # Admin UI com sidebar redimensionável
        ├── docs.md          # Documentação com sidebar e TOC
        ├── chat.md          # Interface de chat com AI SDK
        └── editor.md        # Editor rich text com TipTap
```

### Conteúdo da skill

- **Instalação**: Nuxt e Vue (Vite), incluindo Laravel e AdonisJS
- **Ícones**: Iconify com convenção `i-{collection}-{name}`
- **Theming**: 7 cores semânticas, utilitários CSS, variáveis customizáveis
- **Componentes**: Layout, Element, Form, Data, Navigation, Overlay, Page, Dashboard, Chat, Editor
- **Composables**: useToast, useOverlay, defineShortcuts, defineLocale
- **Layouts**: Page, Dashboard, Docs, Chat, Editor com exemplos completos
- **Templates**: Links para starters oficiais (Starter, Dashboard, SaaS, Landing, etc.)

### Quando a skill é aplicada

O agente usa esta skill quando o usuário:
- Cria interfaces com Vue/Nuxt
- Customiza temas para marcas
- Constrói formulários
- Compõe layouts (dashboards, docs, chat)

### Localização

Skill criada como **skill de projeto** em `.cursor/skills/nuxt-ui/`, disponível para todos que usam o repositório.
