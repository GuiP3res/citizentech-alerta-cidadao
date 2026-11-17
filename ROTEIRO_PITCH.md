# Roteiro simplificado do pitch

## 1. Página inicial (0:00–0:30)

Na tela: Mostre o topo do site.

Olá, sou Guilherme Verrillo Peres, RM 563981, da FIAP. Este é o CitizenTech — Alerta Cidadão, um sistema criado para registrar problemas urbanos, como buracos, iluminação precária e descarte irregular de lixo. Ele atende moradores e pessoas que circulam pela cidade e está relacionado ao ODS 11, de cidades e comunidades sustentáveis.

## 2. Cadastro (0:30–1:15)

Na tela: Role até o formulário, preencha local, categoria, prioridade e descrição; clique em Cadastrar ocorrência.

Aqui temos o formulário de cadastro. Vou registrar uma ocorrência de exemplo, informando o local, a categoria, a prioridade e uma breve descrição. Quando clico em cadastrar, o sistema valida as informações e envia os dados ao servidor, que os salva no MongoDB. Uma mensagem informa se o cadastro foi concluído ou se houve algum erro.

## 3. Indicadores (1:15–1:55)

Na tela: Mostre o total de ocorrências e os resumos por categoria e prioridade.

Logo abaixo temos o painel de indicadores. Ele mostra o número total de ocorrências cadastradas, a quantidade por categoria e um resumo por prioridade. Assim, podemos entender quais problemas aparecem com mais frequência e quais merecem atenção primeiro.

## 4. Lista de ocorrências (1:55–2:20)

Na tela: Role até os registros e clique em Atualizar, se necessário.

Nesta parte, podemos consultar as ocorrências registradas, incluindo os dados enviados no formulário. A listagem é carregada a partir do banco de dados por uma rota GET. O cadastro utiliza uma rota POST, ambas implementadas com Node.js e Express.

## 5. Encerramento (2:20–2:35)

Na tela: Volte ao topo do site.

O CitizenTech reúne relatos urbanos em uma aplicação simples e transforma os registros em informações úteis. Obrigado pela atenção!
