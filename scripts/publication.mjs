import { createHash } from 'node:crypto';

export const canonical = (value) => {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
  return JSON.stringify(value);
};
const text = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(label + ' must be nonempty text');
  return value;
};
const date = (value) => {
  if (value == null) return null;
  if (!value || !['year','month','day','unknown'].includes(value.precision)) throw new Error('Invalid date precision');
  const patterns = { year: /^\d{4}$/, month: /^\d{4}-(0[1-9]|1[0-2])$/, day: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/ };
  if (value.precision === 'unknown') return { precision: 'unknown', value: null };
  if (!patterns[value.precision].test(value.value)) throw new Error('Date and precision disagree');
  if (value.precision === 'day' && new Date(value.value).toISOString().slice(0,10) !== value.value) throw new Error('Invalid calendar date');
  return { precision: value.precision, value: value.value };
};
export function publicPayload(record) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug ?? '')) throw new Error('Invalid story slug');
  if (![2,3].includes(record.layer)) throw new Error('Invalid story layer');
  const segments = (record.segments ?? []).map(s => {
    if (!['memory','document','attributed-claim','commentary'].includes(s.kind)) throw new Error('Invalid evidence kind');
    return { kind: s.kind, text: text(s.text,'Segment'), attribution: s.attribution ?? null, date: date(s.date) };
  });
  if (!segments.length) throw new Error('Approved stories require substantive segments');
  const attachments = (record.attachments ?? []).map(a => {
    if (!/^\/rebirth-assets\/records\/[a-z0-9-]+\.(?:webp|pdf|txt)$/.test(a.url) ||
        !/^[a-f0-9]{64}$/.test(a.sha256) || a.publicationState !== 'approved')
      throw new Error('Only approved public attachment derivatives are allowed');
    return { url:a.url, sha256:a.sha256, label:text(a.label,'Attachment label') };
  });
  return { slug:record.slug, title:text(record.title,'Title'), layer:record.layer,
    eventDate:date(record.eventDate), writtenAt:date(record.writtenAt),
    tags:(record.tags ?? []).map(t=>text(t,'Tag')), segments, attachments };
}
export const revisionHash = (payload) => createHash('sha256').update(canonical(payload)).digest('hex');
export function exportApproved(records) {
  const seen = new Set();
  return records.filter(r=>r.publicationState==='approved').map(r=>{
    const payload = publicPayload(r);
    if (!r.approvedBy || !r.approvedAt || revisionHash(payload)!==r.approvedRevisionHash)
      throw new Error('Approval does not match current public revision: '+r.slug);
    if (seen.has(payload.slug)) throw new Error('Duplicate approved slug: '+payload.slug);
    seen.add(payload.slug); return payload;
  });
}

