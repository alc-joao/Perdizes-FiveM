# Perdizes FiveM

Repositório com as interfaces NUI (telas de navegador embutidas no client do FiveM) desenvolvidas para o servidor **Perdizes**. Cada pasta é um projeto independente em Next.js/TypeScript, com seu próprio `package.json`, instalação e execução.

## Projetos

| Projeto | Descrição |
|---|---|
| [`dealership-experience/`](./dealership-experience) | Concessionária de veículos: catálogo navegável por categoria, estatísticas do veículo, saldo do jogador e fluxo de compra/test drive. |
| [`minigame-perdizes/`](./minigame-perdizes) | Minigame de skill check (acerte a tecla no momento certo), com integração NUI real — envia o resultado (sucesso/falha) para o recurso Lua. |
| [`fuel-station/`](./fuel-station) | HUD de posto de combustível: medidor visual animado do nível do tanque, preço por litro e valor total a pagar. |

Cada pasta tem seu próprio README com detalhes específicos (funcionalidades, configuração, estrutura de pastas).

## Tecnologias utilizadas

| Tecnologia | dealership-experience | minigame-perdizes | fuel-station |
|---|---|---|---|
| Next.js | 16.2.9 | 15.4.6 | 15.4.6 |
| React | 19.1.0 | 19.1.0 | 19.1.0 |
| TypeScript | 5 | 5 | 5 |
| styled-components | 6.4.2 | 6.1.19 | 6.1.19 |
| Framer Motion | 12.40.0 | — | — |
| GSAP | 3.13.0 | 3.13.0 | 3.13.0 |
| ESLint / Prettier / Husky | ✅ | ✅ | ✅ |
| Gerenciador de pacotes | Yarn | Yarn | Yarn |

## Ferramentas de design

O desenvolvimento de todas as interfaces seguiu fielmente os layouts definidos no **Figma**, com apoio da extensão **PixelPerfect** para comparar a tela renderizada com o design original (sobreposição de camadas) e garantir fidelidade visual — espaçamentos, cores, tipografia e proporções consistentes com a referência.

## Pré-requisitos gerais

- [Node.js](https://nodejs.org/) 20 ou superior
- [Yarn](https://yarnpkg.com/) instalado globalmente

## Como rodar cada projeto

Cada projeto é independente — instale e rode de dentro da própria pasta:

```bash
# Dealership Experience
cd dealership-experience
yarn install
yarn dev      # http://localhost:3000

# Minigame Perdizes
cd minigame-perdizes
yarn install
yarn dev      # http://localhost:3000 (ou próxima porta livre)

# Fuel Station
cd fuel-station
yarn install
yarn dev      # http://localhost:3000 (ou próxima porta livre)
```

Para gerar o build de produção de qualquer um dos projetos:

```bash
yarn build
yarn start
```

> Como os 3 projetos usam a porta `3000` por padrão, ao rodar mais de um ao mesmo tempo o Next.js automaticamente usa a próxima porta livre (3001, 3002, ...).
