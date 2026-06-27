# Minigame Perdizes

Interface NUI (tela de navegador embutida no cliente do FiveM) que implementa um minigame de **skill check** — mecânica de "acerte a tecla no momento certo", usada para ações como arrombar fechaduras, hackear terminais, abrir caixas eletrônicas, etc. Um cursor desliza continuamente por uma fileira de casas com teclas aleatórias; o jogador precisa apertar a tecla correta no instante em que o cursor passa pela casa-alvo, em uma ou mais rodadas seguidas, dentro de um tempo limite.

## Funcionalidades

- Cursor animado (GSAP) que percorre a fileira de teclas em loop contínuo, sem saltos visuais.
- Múltiplas rodadas configuráveis (`totalTargets`), cada uma com sua própria fila de teclas sorteada.
- Cronômetro compartilhado entre as rodadas, com barra de progresso visual.
- Feedback animado de acerto (bounce na casa-alvo + pulso no contador) e de erro (shake no card).
- Banner de sucesso/falha ao final da tentativa.
- Integração com o NUI do FiveM: o card abre/fecha via `postMessage` (`{ action: 'open', config }` / `{ action: 'close' }`) e envia o resultado final para o recurso Lua via `fetch` (`https://<resource>/skillResult`).
- Em desenvolvimento (fora de produção), o card abre automaticamente ao carregar a página, sem precisar simular a mensagem do NUI.

## Tecnologias

- **Next.js 15** (App Router, Turbopack) + **React 19**
- **TypeScript 5** (modo strict)
- **styled-components 6** para estilização
- **GSAP 3** para todas as animações (cursor, cronômetro, feedbacks)
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

## Configuração do minigame

Os valores padrão (quantidade de rodadas, quantidade de casas, duração e velocidade do cursor) ficam em `src/components/organisms/skill-check/constants.tsx`, no objeto `skillCheckDefaults`. Esses valores também podem ser sobrescritos por chamada, via o `config` enviado na mensagem NUI `{ action: 'open', config: {...} }`.

## Estrutura de pastas

```
public/
  assets/background, assets/icons → imagem de fundo e ícone do card
  fonts/                          → Gotham, Luxora Grotesk, Roboto

src/
  app/                  → entrypoint do Next.js (layout.tsx, page.tsx)
  components/
    atoms/card-icon/    → ícone do card
    organisms/skill-check/ → componente principal do minigame (UI, loader client-only, constantes, estilos)
  hooks/useSkillCheck.ts → toda a mecânica do jogo (timing, tweens do GSAP, captura de teclado)
  styles/               → tema, estilos globais e definição de fontes
  types/                → nui.d.ts (tipagem do GetParentResourceName), skillcheck.ts (tipos do jogo)
```
