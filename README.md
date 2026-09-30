# ONG Conecta

Projeto front-end acadêmico desenvolvido para representar a presença digital de uma organização da sociedade civil.

## Objetivo

Criar uma interface acessível, responsiva e funcional para apresentar projetos sociais, incentivar doações e facilitar o cadastro de voluntários.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript ES Modules
- Vite
- Git e GitHub
- LocalStorage
- WCAG 2.1 AA

## Estrutura

```text
ong-conecta/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── package.json
└── README.md
```

## Pré-requisitos

- Node.js instalado
- npm
- Git

## Instalação

```bash
git clone URL_DO_REPOSITORIO
cd ong-conecta
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra o endereço exibido pelo Vite no navegador.

## Build de produção

```bash
npm run build
```

A versão de produção é gerada na pasta `dist/`.

Para visualizar a build localmente:

```bash
npm run preview
```

## Acessibilidade

O projeto utiliza landmarks semânticos (`header`, `nav`, `main`, `footer`), link para pular ao conteúdo, foco visível, labels associados aos campos, mensagens de validação, atributos ARIA quando necessários, navegação por teclado e modo escuro.

A interface foi planejada considerando WCAG 2.1 Nível AA.

## GitFlow

Branches utilizadas:

- `main`: versão estável e pronta para produção.
- `develop`: integração do desenvolvimento.
- `feature/*`: desenvolvimento de funcionalidades isoladas.
- `hotfix/*`: correções urgentes da versão publicada.

### Conventional Commits

Exemplos:

```text
feat: adiciona formulário de voluntariado
fix: corrige validação do cadastro
docs: atualiza README
style: ajusta responsividade
release: v1.0.0
```

## Versionamento

A primeira versão estável é `v1.0.0`.

- MAJOR: mudanças incompatíveis.
- MINOR: novas funcionalidades compatíveis.
- PATCH: correções e ajustes.

## Deploy

O projeto pode ser conectado ao GitHub e publicado em plataformas como Vercel, Netlify ou GitHub Pages. Em um fluxo CI/CD, cada atualização da branch de produção pode gerar uma nova build e publicação.

## Testes manuais

Foram considerados:

- navegação com Tab e Shift + Tab;
- foco visível;
- funcionamento do menu mobile;
- alternância do modo escuro;
- validação do formulário;
- persistência com localStorage;
- abertura e fechamento do modal;
- responsividade;
- console do navegador sem erros durante o uso normal.

## Licença

Projeto acadêmico para fins educacionais.
