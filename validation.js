const CATEGORIES = ['Buraco na via', 'Iluminação pública', 'Lixo irregular', 'Acessibilidade', 'Outro'];
const PRIORITIES = ['Baixa', 'Média', 'Alta'];
function validateReport(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'Dados inválidos.' };
  const location = typeof data.location === 'string' ? data.location.trim() : '';
  const description = typeof data.description === 'string' ? data.description.trim() : '';
  const category = data.category;
  const priority = data.priority;
  if (location.length < 3 || location.length > 120) return { error: 'Local deve ter entre 3 e 120 caracteres.' };
  if (!CATEGORIES.includes(category)) return { error: 'Selecione uma categoria válida.' };
  if (!PRIORITIES.includes(priority)) return { error: 'Selecione uma prioridade válida.' };
  if (description.length < 10 || description.length > 500) return { error: 'Descrição deve ter entre 10 e 500 caracteres.' };
  return { value: { location, category, priority, description, createdAt: new Date() } };
}
function summarize(reports) {
  const byCategory = Object.fromEntries(CATEGORIES.map(c => [c, 0]));
  const byPriority = Object.fromEntries(PRIORITIES.map(p => [p, 0]));
  for (const report of reports) {
    if (Object.hasOwn(byCategory, report.category)) byCategory[report.category]++;
    if (Object.hasOwn(byPriority, report.priority)) byPriority[report.priority]++;
  }
  return { total: reports.length, byCategory, byPriority };
}
module.exports = { CATEGORIES, PRIORITIES, validateReport, summarize };
