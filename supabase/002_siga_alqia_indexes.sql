-- SIGA ALQIA 2.0 — índices adicionais recomendados pelo Supabase
create index if not exists coletas_luc_idx on public.coletas (luc);
create index if not exists evidencias_auditor_idx on public.evidencias (auditor_id);
create index if not exists evidencias_luc_idx on public.evidencias (luc);
