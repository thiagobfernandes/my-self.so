# ADR-001: Configuração de ambiente e banco de dados

**Data:** 2026-07-22  
**Status:** Aprovado

## O que foi feito

Estruturei a base de configuração da aplicação em dois pilares: gerenciamento de variáveis de ambiente e conexão com banco de dados PostgreSQL. As variáveis de ambiente (como porta da aplicação, credenciais do banco) são lidas do arquivo `.env` e validadas na inicialização — se algo estiver faltando ou errado, a aplicação nem sobe. A conexão com o banco usa TypeORM apontando para um PostgreSQL rodando em Docker.

## Por que foi feito assim

- **ConfigModule com `registerAs`:** em vez de usar `process.env.ALGUMA_COISA` espalhado pelo código, as configs ficam agrupadas por namespace (`app`, `databaseConfiguration`). Isso facilita injetar só o que cada módulo precisa e torna o código menos frágil a erros de digitação.
- **Validação com Joi:** a aplicação valida todas as variáveis obrigatórias na hora que sobe. A alternativa seria só descobrir que o `DB_HOST` estava faltando quando tentasse fazer a primeira query — com Joi, isso explode na inicialização com uma mensagem clara.
- **`DatabaseModule` genérico com `forRoot` e `forFeature`:** o módulo de banco foi criado como um wrapper sobre o TypeORM para que a configuração fique centralizada e novos módulos de feature possam registrar suas entidades sem precisar reimportar o TypeORM diretamente.

## O que isso impacta

Qualquer nova variável de ambiente precisa ser registrada em dois lugares: no arquivo de `register` correspondente (onde ela é agrupada) e no `schema` de validação Joi. Esquecer o schema faz a app subir sem validar aquela variável — o que derrota o propósito. Da mesma forma, ao criar um novo módulo com entidades do banco, use `DatabaseModule.forFeature([...])` em vez de importar o `TypeOrmModule` diretamente.
