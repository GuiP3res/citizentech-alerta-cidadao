const form = document.querySelector('#report-form');
const message = document.querySelector('#form-message');
const submitButton = document.querySelector('#submit-button');
const categories = ['Buraco na via', 'Iluminação pública', 'Lixo irregular', 'Acessibilidade', 'Outro'];
const priorities = ['Baixa', 'Média', 'Alta'];
const el = (tag, className, content) => { const node = document.createElement(tag); if (className) node.className = className; if (content !== undefined) node.textContent = content; return node; };
function showMessage(text, kind) { message.textContent = text; message.className = `message ${kind}`; }
async function loadReports() {
  const root = document.querySelector('#records');
  try {
    const response = await fetch('/api/ocorrencias');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Falha na consulta.');
    document.querySelector('#total').textContent = data.indicators.total;
    document.querySelector('#high').textContent = data.indicators.byPriority.Alta || 0;
    document.querySelector('#list-count').textContent = `${data.reports.length} exibidos`;
    const chart = document.querySelector('#category-chart'); chart.replaceChildren();
    const max = Math.max(1, ...Object.values(data.indicators.byCategory));
    for (const category of categories) {
      const count = data.indicators.byCategory[category] || 0;
      const row = el('div', 'chart-row');
      const track = el('div', 'track');
      const fill = el('div', 'fill'); fill.style.width = `${count / max * 100}%`;
      track.append(fill);
      row.append(el('span', '', category), track, el('strong', '', String(count)));
      chart.append(row);
    }
    const summary = document.querySelector('#priority-summary'); summary.replaceChildren();
    for (const priority of priorities) summary.append(el('span', 'priority-item', `${priority}: ${data.indicators.byPriority[priority] || 0}`));
    root.replaceChildren();
    if (!data.reports.length) { root.append(el('p', 'muted', 'Nenhuma ocorrência cadastrada ainda. Seja o primeiro a contribuir.')); return; }
    for (const report of data.reports) {
      const article = el('article', 'record');
      const top = el('div', 'record-top');
      const pillClass = report.priority === 'Alta' ? 'alta' : report.priority === 'Média' ? 'media' : '';
      top.append(el('h3', '', report.category), el('span', `pill ${pillClass}`, report.priority));
      const date = new Date(report.createdAt);
      article.append(top, el('p', '', report.description), el('p', '', `Local: ${report.location}`), el('small', '', `Registrado em ${Number.isNaN(date.getTime()) ? 'data indisponível' : date.toLocaleString('pt-BR')}`));
      root.append(article);
    }
  } catch (error) { root.replaceChildren(el('p', 'message error', `Não foi possível carregar os registros: ${error.message}`)); }
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const payload = Object.fromEntries(new FormData(form));
  submitButton.disabled = true; showMessage('Enviando ocorrência...', '');
  try {
    const response = await fetch('/api/ocorrencias', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Falha ao cadastrar.');
    form.reset(); showMessage(data.message, 'success'); await loadReports();
  } catch (error) { showMessage(error.message, 'error'); }
  finally { submitButton.disabled = false; }
});
document.querySelector('#refresh-button').addEventListener('click', loadReports);
loadReports();
