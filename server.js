require('dotenv').config();
const express = require('express');
const path = require('node:path');
const { MongoClient } = require('mongodb');
const { validateReport, summarize } = require('./validation');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

let client;
let collection;
app.get('/api/ocorrencias', async (_req, res) => {
  try {
    const reports = await collection.find({}, { projection: { location: 1, category: 1, priority: 1, description: 1, createdAt: 1 } })
      .sort({ createdAt: -1 }).limit(500).toArray();
    res.json({ reports: reports.map(r => ({ ...r, _id: String(r._id) })), indicators: summarize(reports), limit: 500 });
  } catch (err) {
    console.error('Erro ao consultar ocorrências:', err);
    res.status(500).json({ error: 'Não foi possível consultar as ocorrências.' });
  }
});
app.post('/api/ocorrencias', async (req, res) => {
  const result = validateReport(req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  try {
    const inserted = await collection.insertOne(result.value);
    res.status(201).json({ message: 'Ocorrência cadastrada com sucesso!', id: String(inserted.insertedId) });
  } catch (err) {
    console.error('Erro ao cadastrar ocorrência:', err);
    res.status(500).json({ error: 'Não foi possível salvar a ocorrência.' });
  }
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));
app.use((_req, res) => res.status(404).type('html').send('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>404</title><body><h1>404 — Página não encontrada</h1><a href="/">Voltar ao início</a></body></html>'));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.type === 'entity.parse.failed' ? 'JSON inválido.' : 'Erro interno do servidor.' });
});
async function start() {
  client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'citizentech');
  collection = db.collection('ocorrencias');
  await collection.createIndex({ createdAt: -1 });
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`CitizenTech disponível em http://localhost:${port}`));
}
start().catch(err => { console.error('Falha ao conectar ao MongoDB:', err.message); process.exit(1); });
process.on('SIGINT', async () => { if (client) await client.close(); process.exit(0); });
