# CitizenTech — Alerta Cidadão

**Global Solution 2026.2 — Application Development**  
**Aluno:** Guilherme Verrillo Peres — **RM:** 563981  
**Professor:** Allan Roberto Molto

## Problema, público e objetivo

Buracos nas vias, falhas na iluminação, lixo irregular e barreiras de acessibilidade prejudicam a segurança, a mobilidade e a qualidade de vida. O público-alvo são moradores e pessoas que circulam nas cidades. O objetivo é registrar ocorrências urbanas e permitir a consulta dos relatos, oferecendo indicadores que ajudam a identificar os problemas mais frequentes e suas prioridades. Trata-se de um protótipo acadêmico; os registros não são enviados à prefeitura.

**ODS relacionado:** ODS 11 — Cidades e Comunidades Sustentáveis.

## Tecnologias

HTML, CSS, JavaScript, Node.js 18+, Express 4 e MongoDB (driver oficial).

## Como executar

1. Instale Node.js 18+ e tenha um servidor MongoDB em execução (local ou Atlas).
2. Na pasta do projeto, execute `npm install`.
3. Copie `.env.example` para `.env` e ajuste `MONGODB_URI` se necessário. Exemplo local: `mongodb://127.0.0.1:27017`. Para Atlas, use sua string de conexão e **não publique credenciais**.
4. Execute `npm start`.
5. Abra `http://localhost:3000` no navegador.
6. Preencha o formulário e confira o registro na listagem e nos indicadores.

**Testes de validação e indicadores:** `npm test` (não requer MongoDB). Para testar a aplicação completa, é necessário ter MongoDB disponível.

## Funcionalidades e rotas

- `GET /`: interface responsiva com formulário, painel e listagem.
- `POST /api/ocorrencias`: recebe JSON com `location`, `category`, `priority` e `description`; valida os campos e salva na coleção MongoDB `ocorrencias`.
- `GET /api/ocorrencias`: consulta até 500 registros recentes, retorna listagem e indicadores.
- Rotas inexistentes retornam HTTP 404; campos inválidos retornam HTTP 400; erros de servidor retornam HTTP 500.

**Indicadores:** (1) quantidade total de ocorrências consultadas; (2) contagem por categoria; (3) contagem por prioridade, incluindo total de prioridade alta. Os indicadores são calculados sobre os até 500 registros mais recentes retornados pela consulta. Para o escopo acadêmico do protótipo, esse limite é suficiente; em produção, seria recomendável calcular agregações sobre toda a coleção.

## Estrutura

- `server.js`: servidor Express, integração MongoDB, GET/POST e erros.
- `validation.js`: validação e agrupamentos.
- `validation.test.js`: testes automatizados sem banco.
- `public/index.html`: interface e introdução.
- `public/style.css`: estilos responsivos.
- `public/app.js`: requisições, mensagens, listagem e indicadores.
- `.env.example`: exemplo de configuração (sem senhas).

## Vídeo pitch (obrigatório no enunciado)

**Link do vídeo (2–3 minutos):** https://youtu.be/thF9SnADL2U

O vídeo precisa ser gravado pelo aluno com a aplicação funcionando e publicado em um link acessível. O roteiro está no arquivo `ROTEIRO_PITCH.md`.
