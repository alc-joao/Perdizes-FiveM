# Fuel Station

Interface NUI (tela de navegador embutida no cliente do FiveM) que funciona como o **HUD/painel de um posto de combustível**. Exibe a porcentagem do tanque em um medidor visual animado (onda de líquido), o preço por litro e o valor total a pagar pelo abastecimento.

## Funcionalidades

- Medidor de combustível em SVG com animação de onda contínua (GSAP) — o nível sobe/desce com leve "overshoot" e assentamento elástico, simulando o comportamento de um líquido real.
- Cálculo automático da porcentagem do tanque e do valor total a pagar, a partir de `capacidadeMaxima`, `litrosAtuais` e `precoPorLitro`.
- Painel de demonstração (`FuelDemoPanel`) com um slider para simular a variação do nível de combustível durante o desenvolvimento.

> **Atenção:** a página atual (`src/app/page.tsx`) renderiza `FuelStationDemo`, que é **somente para desenvolvimento** — ela junta o card real (`FuelStation`) com o painel de slider de demonstração. Antes de usar em produção no FiveM, troque `FuelStationDemo` por `FuelStation` diretamente, alimentando-o com os dados reais enviados pelo recurso Lua. Também não há, ainda, integração NUI real (`postMessage`/callback) implementada — o componente é puramente apresentacional, controlado por props.

## Tecnologias

- **Next.js 15** (App Router, Turbopack) + **React 19**
- **TypeScript 5** (modo strict)
- **styled-components 6** para estilização
- **GSAP 3** para a animação do medidor de combustível
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

A aplicação fica disponível em [http://localhost:3000](http://localhost:3000) (ou na próxima porta livre, caso a 3000 já esteja em uso).

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
  assets/background, assets/icons → imagem de fundo e ícones
  fonts/                          → Gotham, Luxora Grotesk, Roboto

src/
  app/                       → entrypoint do Next.js (layout.tsx, page.tsx)
  components/organisms/
    fuel-station/            → card real do HUD
      fuel-gauge/             → medidor visual em SVG (onda animada)
    fuel-station-demo/       → wrapper que junta o card real + o painel de demo
    fuel-demo-panel/         → painel com slider, só para desenvolvimento/demonstração
  hooks/
    useFuelStation.ts        → calcula porcentagem do tanque e valor total
    useFuelGauge.ts          → anima a onda do medidor (GSAP, sem re-render React)
  styles/                    → tema, estilos globais e definição de fontes
  types/                     → fuelstation.ts (config do HUD), nui.d.ts (tipagem do GetParentResourceName)
```
