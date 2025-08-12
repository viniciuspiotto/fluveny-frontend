# 🚀 Fluveny - Frontend

## ✅ Requisitos

- **Node.js**: >= v23
- **pnpm**: >= v10.11

## 📦 Instalação

Clone o repositório e instale as dependências com pnpm:

```bash
git clone https://github.com/Fluveny/fluveny-frontend.git
cd fluveny-frontend
pnpm i
```

## ▶️ Rodando a aplicação

Para iniciar a aplicação em ambiente de desenvolvimento:

```bash
pnpm dev
```

## 🛠 Scripts Disponíveis

| Comando        | Descrição                            |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Inicia o ambiente de desenvolvimento |
| `pnpm build`   | Gera o build de produção             |
| `pnpm preview` | Inicia a aplicação em produção       |

## 📂 Organização das pastas

- `/public`: Arquivos estáticos que são servidos diretamente ao navegador sem passar pelo processo de build do Vite.
- `/src/styles`: Estilos base para toda a aplicação.
- `/src/@types`: Declaração de tipos e interfaces que serão reutilizadas.
- `/src/app`: Centraliza as configurações da aplicação.
- `/src/app/config`: Configurações gerais.
- `/src/app/libs`: Configurações de bibliotecas externas.
- `/src/app/providers`: Providers de bibliotecas externas.
- `/src/app/routes`: Roteamento da aplicação.
- `/src/app/utils`: Funções utilitárias reutilizáveis.
- `/src/components`: Pasta para componentes de UI genéricos que podem ser reutilizados em qualquer parte da aplicação.
- `/src/components/ui`: Contém componentes de UI atômicos e básicos.
- `/src/template`: Componentes responsáveis pela estrutura e templates das páginas, como `header`, `sidebar`.
- `/src/features`: O código é organizado por domínios de negócio.
- `/src/features/[nome_da_feature]/components`: Componentes de UI que pertencem exclusivamente àquela funcionalidade.
- `/src/features/[nome_da_feature]/hooks`: Hooks customizados do React que contêm a lógica de estado.
- `/src/features/[nome_da_feature]/hooks/api`: Subdivisão dos hooks para separar em:
  - `queries`: Para buscar dados (GET).
  - `mutations`: Para modificar dados no servidor (POST, PUT, DELETE).
- `/src/features/[nome_da_feature]/pages`: Os componentes de página completos que são renderizados pelas rotas definidas em `/src/app/routes`.
- `/src/features/[nome_da_feature]/schemas`: Esquemas de validação de dados.
- `/src/features/[nome_da_feature]/services`: Funções que encapsulam a lógica de chamada à API.
- `/src/features/[nome_da_feature]/stores`: Gerenciamento de estado local ou global para a funcionalidade.
