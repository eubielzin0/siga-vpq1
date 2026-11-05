# SIGA ALQIA 2.0 — Bossa Nova Mall

Ramificação de desenvolvimento separada da versão original do Via Parque. A identidade visual existente será preservada. **Nenhum dado antigo deve ser migrado automaticamente.**

## O que está preparado

- `supabase/001_siga_alqia_bnm.sql`: esquema inicial do Supabase (perfis, lojas, coletas, turnos, evidências, RLS e armazenamento privado).
- `supabase/002_siga_alqia_indexes.sql`: índices de desempenho.
- `supabase/003_cadastro_bnm_classificacoes.sql`: campos de classificação NAPP, INFORMA, COLETA, POS, PRESENCIAL e cadastro com LUC opcional.
- Perfis compatíveis com o código original: `coordenador` (líder/ADM) e `auditor`.
- No novo banco, novos usuários recebem inicialmente o perfil `auditor`. Os dois líderes serão promovidos pelo administrador autorizado no painel/SQL, nunca pelo código público.
- O projeto Supabase **siga-alqia-bnm** foi criado em 05/11/2026 e está ativo (região São Paulo). Referência: `nvtmwabvrukyidusmfdg`.
- As migrations `001`, `002` e `003` foram aplicadas com sucesso no novo banco. Há cinco tabelas operacionais, RLS em todas elas e dois buckets privados.
- Em 05/11/2026 foram cadastradas **46 lojas** exclusivamente no banco privado: **45 ativas**, **1 inativa**, **37 com coleta SIM**, **39 com INFORMA SIM**, **26 com NAPP SIM**, **24 com POS SIM**, **33 com PRESENCIAL SIM**.
- Os dois registros BAURUCAS foram preservados: código interno BNM-002 (ativo) e BNM-003 (inativo). Códigos BNM-001 a BNM-046 são identificadores internos, **não são LUC**.
- Os 46 registros estão sem LUC e sem pavimento porque o usuário não forneceu esses valores. A sequência inicial da rota é provisória e não corresponde a uma rota física validada.
- Por confidencialidade operacional, o arquivo de dados/classificações **não foi publicado** neste repositório público. Os registros estão no Supabase privado.
- As quatro contas **ainda não foram criadas**; faltam os e-mails individuais dos dois líderes e dois auditores.

## Sequência de implantação

1. **Concluído:** projeto separado Supabase criado na organização autorizada, custo informado pela plataforma: US$ 0/mês no momento da criação.
2. **Concluído:** migrations `001` e `002` instaladas. Alertas de segurança Supabase: nenhum. Testes de ponta a ponta com usuários reais: pendentes.
3. Criar quatro usuários autenticados com e-mails reais (dois líderes e dois auditores), conferir o perfil gerado por trigger e promover os líderes com acesso administrativo.
4. **Parcialmente concluído:** cadastrar/validar 46 lojas BNM no Supabase com classificação. Ainda faltam os LUCs, os pavimentos, blocos e a ordem da rota física.
5. **Concluído na ramificação:** adaptar `index.html` à API pública do novo projeto, carregando lojas ativas com coleta SIM em uma rota BNM provisória e mostrando todo o cadastro no painel administrativo. Atualizados manifesto e cache PWA. Não foi publicado um ambiente novo de produção.
6. Testar login, RLS, upload de POS/Sistema, visualização com assinaturas temporárias e exportação ZIP do dia no PC, antes de usar documentos reais.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Banco do SIGA BNM:** https://supabase.com/dashboard/project/nvtmwabvrukyidusmfdg (ativo). O front-end nesta ramificação já aponta para ele e consulta a tabela BNM de lojas. Falta cadastrar e testar as quatro contas, executar testes funcionais no navegador, e publicar a nova versão em ambiente separado. O link publicado anteriormente continua sendo do Via Parque; não o utilize com registros comerciais reais do Bossa Nova.
