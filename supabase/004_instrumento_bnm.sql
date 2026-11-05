-- SIGA ALQIA BNM: instrumento contratual independente do LUC
alter table public.lojas add column if not exists instrumento text;
create unique index if not exists lojas_instrumento_unique on public.lojas(instrumento)
  where instrumento is not null;