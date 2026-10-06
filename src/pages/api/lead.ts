import type { APIRoute } from 'astro';

export const prerender = false;

const FIELDS = ['nome', 'attivita', 'telefono', 'email', 'servizio', 'budget', 'messaggio', 'ref', 'utm_source', 'utm_campaign', 'pagina'] as const;
type Lead = Record<(typeof FIELDS)[number], string>;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Richiesta non valida.' }, 400);
  }

  // Honeypot: i bot compilano anche il campo nascosto
  if (typeof data.sito_web === 'string' && data.sito_web.trim()) return json({ ok: true });

  const lead = Object.fromEntries(
    FIELDS.map((k) => [k, typeof data[k] === 'string' ? (data[k] as string).trim().slice(0, 2000) : '']),
  ) as Lead;

  if (!lead.nome || !lead.attivita || (!lead.telefono && !lead.email) || data.privacy !== true) {
    return json({ ok: false, error: 'Compila nome, attività e almeno un recapito, e accetta la privacy.' }, 400);
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return json({ ok: false, error: 'L’indirizzo email non sembra valido.' }, 400);
  }

  const key = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const to = import.meta.env.LEAD_TO_EMAIL ?? process.env.LEAD_TO_EMAIL;
  const from = import.meta.env.RESEND_FROM ?? process.env.RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>';
  if (!key || !to) {
    console.error('[lead] Configurazione mancante:', !key && 'RESEND_API_KEY', !to && 'LEAD_TO_EMAIL');
    return json({ ok: false, error: 'Il modulo non è disponibile in questo momento.' }, 503);
  }

  const rows: [string, string][] = [
    ['Nome', lead.nome],
    ['Attività', lead.attivita],
    ['Telefono', lead.telefono],
    ['Email', lead.email],
    ['Cosa serve', lead.servizio],
    ['Budget', lead.budget],
    ['Messaggio', lead.messaggio],
    ['Provenienza', [lead.ref && `ref=${lead.ref}`, lead.utm_source && `utm_source=${lead.utm_source}`, lead.utm_campaign && `utm_campaign=${lead.utm_campaign}`].filter(Boolean).join(' · ')],
    ['Pagina', lead.pagina],
  ];
  const html = `<h2 style="font-family:sans-serif">Nuova richiesta dal portfolio</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s: string) => s.trim()),
      subject: `Nuova richiesta: ${lead.attivita} (${lead.nome})`,
      html,
      text,
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
  });

  if (!res.ok) {
    console.error('[lead] Resend ha risposto', res.status, await res.text());
    return json({ ok: false, error: 'Invio non riuscito. Riprova o scrivimi su WhatsApp.' }, 502);
  }
  return json({ ok: true });
};
