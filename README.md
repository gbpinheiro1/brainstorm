# Brainstorm

**Plataforma web de exploração criativa assistida por IA.**
O usuário parte de uma premissa ou de ideias soltas, e a IA ajuda a **expandir** e **mesclar** possibilidades, preservando toda a linhagem de como cada ideia evoluiu e permitindo o usuário salvá-la quando sentir que o resultado está satisfatório.

> 🚧 **Status:** MVP em desenvolvimento · **Demo:** _em breve_ · **Foco inicial:** audiovisual, criadores de conteúdo e publicidade

<!-- Adicione aqui um GIF ou screenshot do fluxo principal quando disponível -->

---

## O problema

Ferramentas de IA costumam funcionar como chats: o resultado é uma conversa longa e desorganizada. O Brainstorm troca o chat aberto por um **fluxo estruturado de exploração**, em que cada ideia tem origem, ramificações e histórico.

## Como funciona

0. **Entrar na conta** (cada usuário vê apenas as próprias ideias).
1. Escolher entre **partir de uma premissa** ou **misturar ideias existentes**.
2. Informar o conteúdo e escolher a área criativa.
3. A IA gera de 3 a 5 direções.
4. **EXPANDIR** uma ideia ou **MESCLAR** várias, quantas vezes quiser.
5. **SALVAR** o resultado final e consultá-lo depois, com a árvore de evolução.

```
Premissa → Ideia A → Expansão A1 → Expansão A1.1
                  ↘ Mesclagem (A1 + B)
```

## Stack

| Camada         | Tecnologias                                                |
| -------------- | ---------------------------------------------------------- |
| Frontend       | React, TypeScript, Tailwind CSS                            |
| Backend        | Node.js, Express, TypeScript, API REST                     |
| Banco de dados | PostgreSQL, Drizzle ORM (schema e migrations)              |
| Autenticação   | Better Auth                                                |
| IA             | Gemini API                                                 |
| Infraestrutura | Vercel (frontend), Railway (backend), Neon (banco), GitHub |

## Arquitetura

```
React (Vercel) → API Node.js (Railway) → serviços de domínio → Drizzle ORM → PostgreSQL (Neon)
                                              └→ serviço de IA → Gemini API
```

Frontend, backend e banco são **hospedados e versionados de forma independente**.

## Destaques técnicos

- **Autenticação desde o início com Better Auth:** cada usuário tem seu próprio histórico, e o backend garante que ninguém acesse brainstorms ou ideias de outra conta.
- **Linhagem de ideias modelada desde o início:** relação pai/filho entre ideias e uma tabela de origens que suporta mesclagens com múltiplas fontes.
- **IA isolada atrás de um serviço interno:** nenhuma chamada ao modelo espalhada pelo código, o que facilita trocar de provedor.
- **Respostas da IA em JSON estruturado e validadas** no backend antes de qualquer persistência.
- **Segredos somente no backend:** a chave da IA nunca chega ao navegador, e o React não acessa o banco diretamente.
- **Registro de cada operação de IA** para diagnóstico e controle de custos.
- **Limites de uso e rate limiting** pensados desde cedo, por causa do custo variável de IA.
- **Migrations versionadas** para toda mudança no banco.
- **Arquitetura em camadas** com regras de negócio centralizadas no backend.

## API (resumo)

| Método | Endpoint                    | Objetivo             |
| ------ | --------------------------- | -------------------- |
| `POST` | `/brainstorms`              | Criar brainstorm     |
| `POST` | `/brainstorms/:id/generate` | Gerar ideias         |
| `POST` | `/ideas/:id/expand`         | Expandir ideia       |
| `POST` | `/brainstorms/:id/merge`    | Mesclar ideias       |
| `POST` | `/ideas/:id/save`           | Salvar ideia         |
| `GET`  | `/saved-ideas`              | Listar ideias salvas |

## Estrutura do projeto

```
brainstorm/
├── frontend/   # React + TypeScript + Tailwind
├── backend/    # API Node.js, serviço de IA, módulos de domínio
│   └── src/db/ # Schema e migrations (Drizzle)
└── README.md
```

## Executar localmente

Pré-requisitos: Node.js (LTS), PostgreSQL local e uma chave da Gemini API.
Configure os arquivos `.env` do frontend e do backend a partir dos respectivos `.env.example`, aplique as migrations e inicie as duas aplicações.

_Instruções detalhadas serão adicionadas conforme o projeto avançar._

## Roadmap

- Planejamento, escopo e modelo de domínio
- Fundação: repositório, frontend, backend, banco e schema
- API REST e serviço de IA
- Fluxo completo: gerar, expandir, mesclar, salvar e histórico
- Testes, segurança e deploy em produção
- **MVP 1.0**

**Depois do MVP:** edição manual e tags · expansão com outras áreas criativas (games, design, literatura, música) · colaboração.

## Autor

**Gabriel Pinheiro** · [LinkedIn](https://www.linkedin.com/in/gabriel-pinheiro-da-silva/) · [GitHub](https://github.com/gbpinheiro1)
