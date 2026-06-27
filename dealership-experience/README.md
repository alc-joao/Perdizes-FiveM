# Dealership Experience

Interface NUI (tela de navegador embutida no cliente do FiveM) que simula a experiência de uma concessionária de veículos dentro do servidor. O painel exibe um catálogo de veículos navegável por categoria, estatísticas de desempenho do veículo selecionado, saldo do jogador (dinheiro e diamantes) e ações de compra/test drive com feedback visual e sonoro.

## Funcionalidades

- Catálogo de veículos filtrável por categoria (Competitivos, Esportivos, Sedans, SUVs, Motos, Caminhões).
- Carrossel de veículos navegável por clique ou pelas setas do teclado.
- Painel de estatísticas (velocidade máxima, aceleração, tração, portas) do veículo em destaque.
- Fluxo de compra e test drive com modal de confirmação, validação de saldo e persistência local (`localStorage`) do saldo e dos veículos já adquiridos.
- Feedback sonoro em interações (clique e sucesso) e animações de entrada/transição em toda a interface.

> Este projeto é uma camada de front-end (UI/UX). Os dados de veículos, saldo e categorias são mocados em `src/constants` — não há integração com callbacks NUI do FiveM ou recursos Lua nesta pasta.

## Tecnologias

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript 5** (modo strict)
- **styled-components 6** para estilização
- **Framer Motion 12** e **GSAP 3** para animações
- **ESLint 9** + **Prettier** + **Husky/lint-staged** para qualidade e padronização de código
- Gerenciador de pacotes: **Yarn**

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [Yarn](https://yarnpkg.com/) instalado globalmente

## Instalação e execução

```bash
# 1. Instalar as dependências
yarn install

# 2. Rodar em modo desenvolvimento
yarn dev
```

A aplicação fica disponível em [http://localhost:3000](http://localhost:3000).

Para gerar e rodar o build de produção:

```bash
yarn build
yarn start
```

## Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `next dev --turbopack` | Inicia o servidor de desenvolvimento com Turbopack |
| `build` | `next build` | Gera o build de produção |
| `start` | `next start` | Roda o build de produção já gerado |
| `lint` | `eslint src --ext .ts,.tsx,.js,.jsx` | Executa o lint do código-fonte |

## Estrutura de pastas

```
public/
  audio/            → efeitos sonoros (clique, sucesso)
  fonts/             → fontes customizadas (Gotham, Roboto, SF Pro Display)
  imgs/              → imagens de fundo e veículos
  svgs/icons/        → ícones SVG usados na interface

src/
  app/               → entrypoint do Next.js (layout.tsx, page.tsx)
  components/
    molecules/       → HeaderIntro (cabeçalho de boas-vindas)
    organisms/       → StatsPanel, VehicleActions (compra/test drive) e VehicleCarousel
  constants/dealership/ → veículos mocados por categoria, lista de categorias e saldo do usuário
  hooks/             → useDealership.ts (estado e lógica de seleção/filtragem de veículos)
  styles/            → tema, estilos globais e definição de fontes
  templates/         → DealershipTemplate (composição final da página)
  types/             → tipagem de Vehicle e VehicleStat
  utils/             → audio.ts (reprodução de efeitos sonoros)
```
