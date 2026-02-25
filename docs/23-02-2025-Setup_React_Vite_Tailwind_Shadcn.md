# 23/02/2025 - Setup React + Vite + Tailwind CSS + Shadcn

## O que foi implementado

Configuração completa de um projeto React com Vite, Tailwind CSS v4 e shadcn/ui.

### Stack instalada

- **React 19** + **TypeScript**
- **Vite 7** - Build tool e dev server
- **Tailwind CSS v4** - Framework CSS utility-first com plugin `@tailwindcss/vite`
- **shadcn/ui** - Componentes UI acessíveis e customizáveis (estilo new-york, cor base neutral)

### Dependências principais

- `tailwindcss`, `@tailwindcss/vite` - Tailwind CSS v4
- `clsx`, `tailwind-merge`, `class-variance-authority` - Utilitários para classes CSS
- `lucide-react` - Ícones
- `radix-ui` - Primitivos acessíveis (usados pelo shadcn)
- `tw-animate-css` - Animações

### Configurações realizadas

1. **vite.config.ts**
   - Plugin Tailwind CSS
   - Alias `@` apontando para `./src`

2. **tsconfig.json**
   - `baseUrl` e `paths` para o alias `@/*`

3. **src/index.css**
   - Import do Tailwind
   - Variáveis CSS do shadcn (tema light/dark)
   - Tokens de cores e radius

4. **components.json**
   - Configuração do shadcn (aliases, estilo, cor base)

5. **src/lib/utils.ts**
   - Função `cn()` para merge de classes Tailwind

### Como adicionar componentes shadcn

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

### Comandos disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Linter
