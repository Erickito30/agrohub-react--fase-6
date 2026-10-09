# Parte do Pietro - revisada com favoritos

## Entregue

- Home identificada como Fase 6, com secao de pitch em componente separado.
- Links historicos preservados; link da Fase 6 configuravel em `src/data/pitches.js`.
- Introducao reutilizavel em Cadastro e Contato (`PageIntro`).
- UML em Mermaid, PNG, SVG e PDF, revisado sobre o commit `8c924ac` do repositorio
  `Erickito30/agrohub-react--fase-6`.
- Favoritos do colega preservados: salvar/remover, filtro Salvos, contador,
  filtros por categoria/distancia e persistencia das copias em localStorage.

## UML fiel ao codigo

> Atualizacao: o grupo decidiu usar um modelo de dominio com heranca
> (Usuario -> Produtor/ONG) e metodos em todas as classes, para cobrir todos os
> itens do enunciado. O diagrama atual e a explicacao estao em [UML.md](UML.md).
> O texto abaixo descreve a versao anterior, mantida como historico.

O diagrama e um modelo de analise UML, nao uma lista de declaracoes JavaScript
`class`: a aplicacao usa componentes funcionais, hooks e objetos simples.
Os nomes das operacoes exibidas agora correspondem literalmente a funcoes
presentes no codigo. Nenhuma classe Favorito foi criada ou presumida.

| Elemento | Dados e comportamento existentes |
| --- | --- |
| Produtor (boundary) | Dados do formulario `produto`, `quantidade`, `validade`, `retirada`; `handleSubmit(event)` em `src/pages/Produtor.jsx`. Os campos pertencem ao formulario, nao ao useState. |
| NotificationsProvider (control) | Arrays `excedentes` e `notifications`, contador derivado `unreadCount`, funcoes `addExcedente(dados)` e `markAllAsRead()` em `src/context/NotificationsContext.jsx`. |
| Ong (boundary) | Estados `activeFilter`, `maxDistance`, `scheduledIds`, `favorites`, `showingFavorites`; funcoes `handleSchedule(id)` e `toggleFavorite(item)` em `src/pages/Ong.jsx`. |
| Excedente (data) | Objeto com os campos criados pelo provider ou definidos nos itens de exemplo do painel. Nao tem metodos proprios; quem agenda/salva e o painel Ong. |
| Notificacao (data) | Objeto com `id`, `mensagem`, `hora`, `lida`. Nao tem metodos proprios; a leitura e atualizada por `markAllAsRead()` no provider. |

As operacoes artificiais do primeiro rascunho, como `Excedente.agendar()` e
`Notificacao.marcarComoLida()`, foram retiradas. Filtragem e persistencia sao
explicadas como logica de hooks, sem inventar nomes de metodos.

## Favoritos

`toggleFavorite(item)` verifica o ID: remove se ja estiver salvo; caso contrario,
inclui o objeto no array `favorites`. `showingFavorites` alterna a fonte da lista.
Um `useMemo` combina essa selecao com categoria e distancia; `useEffect` grava
o array como JSON na chave `agrohub-ong-favorites`. O inicializador de useState
le o JSON ao abrir o painel. Sao copias locais de excedentes, nao registros de
um servidor nem favoritos compartilhados entre contas/dispositivos.

A associacao Ong -> Excedente representa essas copias salvas na sessao/perfil
local do navegador. A multiplicidade `1` representa uma instancia do painel,
nao uma restricao de que um alimento so possa ser salvo por uma ONG real.

## Relacionamentos e notacao

- `boundary`: interacao com o usuario. `control`: coordenacao do estado.
  `data`: objeto de dados, sem comportamento proprio.
- `+`: publico no modelo; `-`: estado interno. Isso nao e modificador de acesso JS.
- Seta tracejada: dependencia. Produtor cadastra usando o provider; Ong consulta
  o contexto com useNotifications.
- Losango preenchido: composicao do estado do provider na sessao. Os itens de
  exemplo e as copias persistidas dos favoritos existem fora dessa composicao.
- Associacao Excedente-Notificacao: um cadastro gera uma notificacao; itens de
  exemplo nao geram, por isso `0..1`. O ID relaciona o par, nao uma referencia JS.
- `0..*`: zero ou varios objetos. Nao foi adicionada heranca sem existir necessidade.

## Integracao

A branch local e `fase6/pietro-integracao-uml`. Nenhum push ou deploy foi feito.
O ZIP e uma copia completa baseada no repositorio novo. O patch fornecido
contem somente as mudancas do Pietro em relacao ao commit `8c924ac`.

Na raiz de uma copia dessa base, conferir antes de aplicar:

```sh
git apply --check pietro-fase6-atualizado.patch
git apply pietro-fase6-atualizado.patch
```

Se os colegas tiverem alterado os mesmos arquivos depois, comparar as mudancas
antes de integrar. Nao substituir o repositorio inteiro com o ZIP sem conferir.

## Fechamento externo

Joao publica o video publico de ate 3 minutos e informa o link. Entao preencher
PHASE_6_VIDEO_URL, gerar o build final e publicar. Joao inclui a imagem do UML,
nomes completos e links do video/deploy no PDF final e organiza o ZIP da entrega.

## Limites herdados

Cadastro/contato sao simulacoes sem envio ao servidor. Excedentes e notificacoes
do provider somem ao recarregar; favoritos preservam suas copias. O agendamento
usa estado local do painel, separado das copias salvas. O grupo deve conferir
se o status de agendamento permanece coerente entre Salvos/Todos e apos reload.
O armazenamento de favoritos nao valida o formato do JSON e a escrita nao trata
falha de armazenamento. Esses pontos pertencem a revisao do dashboard pelo grupo.
