# AgroHub - Fase 6: integracao da parte do Pietro

Base: https://github.com/Erickito30/agrohub-react--fase-6
Commit do colega preservado: `8c924ac` (favoritos no painel ONG).

Esta versao integra os ajustes da Home, Cadastro e Contato do Pietro com os
favoritos ja implementados pelo colega. O painel ONG e o CSS nao foram alterados
por esta integracao. O UML foi revisado conforme os dados e funcoes existentes.

- [Entrega e correspondencia do UML](docs/fase6/ENTREGA-PIETRO.md)
- [Diagrama em imagem](docs/fase6/diagrama-classes.png)
- [Fonte Mermaid editavel](docs/fase6/diagrama-classes.mmd)
- [Divisao atualizada do grupo](docs/fase6/DIVISAO-GRUPO.md)

## Executar

```sh
cd agrohub-react
npm ci
npm run dev
```

Build: `npm run build` na pasta `agrohub-react`.

Para ativar o link do pitch na Home, preencher `PHASE_6_VIDEO_URL` em
`agrohub-react/src/data/pitches.js` com a URL HTTPS do video publico da Fase 6.
Gerar novo build depois de alterar. O link ainda depende da publicacao do video.

O Vite herdou `base: /agrohub-react-fase5/`. Antes do deploy no GitHub Pages do
novo repositorio, Erick deve ajustar para `/agrohub-react--fase-6/`. Se o grupo
escolher dominio raiz/Vercel, usar a base correspondente. O app usa HashRouter.

Os documentos antigos HANDOVER.md e agrohub-react/README.md sao historicos da
Fase 5. Seguir docs/fase6 para esta entrega. O PDF de UML e material de apoio;
Joao ainda precisa montar o PDF final com nomes completos e links reais.
