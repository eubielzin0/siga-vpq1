# SIGA ALQIA 2.0 — Bossa Nova Mall

Ramificação de desenvolvimento separada da versão original do Via Parque. A identidade visual existente será preservada. **Nenhum dado antigo deve ser migrado automaticamente.**

## O que está preparado

- `supabase/001_siga_alqia_bnm.sql`: esquema inicial do Supabase (perfis, lojas, coletas, turnos, evidências, RLS e armazenamento privado).
- `supabase/002_siga_alqia_indexes.sql`: índices de desempenho.
- `supabase/003_cadastro_bnm_classificacoes.sql`: campos de classificação NAPP, INFORMA, COLETA, POS, PRESENCIAL e cadastro com LUC opcional.
- `supabase/004_instrumento_bnm.sql`: campo instrumento contratual com índice único.
- Perfis compatíveis com o código original: `coordenador` (líder/ADM) e `auditor`.
- No novo banco, novos usuários recebem inicialmente o perfil `auditor`. Os dois líderes serão promovidos pelo administrador autorizado no painel/SQL, nunca pelo código público.
- O projeto Supabase **siga-alqia-bnm** foi criado em 05/11/2026 e está ativo (região São Paulo). Referência: `nvtmwabvrukyidusmfdg`.
- As migrations `001`, `002`, `003` e `004` foram aplicadas com sucesso no novo banco. Há cinco tabelas operacionais, RLS em todas elas e dois buckets privados.
- Em 05/11/2026 o cadastro foi atualizado para **47 registros**, **46 ativos**, **1 inativo**, **38 com COLETA SIM**, **40 com INFORMA SIM**, **27 com NAPP SIM**, **25 com POS SIM**, **34 com PRESENCIAL SIM**. Os **47 LUCs** e **47 instrumentos** foram preenchidos e verificados como únicos.
- Os dois registros BAURUCAS foram preservados: código interno BNM-002 (ativo) e BNM-003 (inativo). Códigos BNM-001 a BNM-047 são identificadores internos, **não são LUC**. A referência Xian antes genérica passou a **Xian [Restaurante]**, LUC 6000; incluído **Xian [Bar]**, LUC Q-13, como registro distinto.
- Os **47 LUCs e instrumentos estão completos**; **pavimentos, blocos e sequência física da rota** continuam pendentes. A ordenação atual é provisória e não corresponde a uma rota física validada.
- Por confidencialidade operacional, o arquivo de dados/classificações **não foi publicado** neste repositório público. Os registros estão no Supabase privado.
- As quatro contas **ainda não foram criadas**; faltam os e-mails individuais dos dois líderes e dois auditores.

## Sequência de implantação

1. **Concluído:** projeto separado Supabase criado na organização autorizada, custo informado pela plataforma: US$ 0/mês no momento da criação.
2. **Concluído:** migrations `001` a `004` instaladas. Alertas de segurança Supabase: nenhum. Testes de ponta a ponta com usuários reais: pendentes.
3. Criar quatro usuários autenticados com e-mails reais (dois líderes e dois auditores), conferir o perfil gerado por trigger e promover os líderes com acesso administrativo.
4. **Parcialmente concluído:** 47 lojas BNM e suas classificações, LUCs e instrumentos cadastrados no Supabase privado. Restam pavimentos, blocos e ordem da rota física.
5. **Concluído na ramificação:** adaptar `index.html` à API pública do novo projeto, carregando lojas ativas com coleta SIM em uma rota BNM provisória e mostrando todo o cadastro no painel administrativo. Agora as telas de coleta exibem LUC e instrumento discretamente abaixo do nome e novos registros de coleta/evidência vinculam o LUC. Atualizados manifesto e cache PWA. Não foi publicado um ambiente novo de produção.
6. Testar login, RLS, upload de POS/Sistema, visualização com assinaturas temporárias e exportação ZIP do dia no PC, antes de usar documentos reais.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Banco do SIGA BNM:** https://supabase.com/dashboard/project/nvtmwabvrukyidusmfdg (ativo). O front-end nesta ramificação já aponta para ele e consulta a tabela BNM de lojas. Falta cadastrar e testar as quatro contas, executar testes funcionais no navegador, e publicar a nova versão em ambiente separado. O link publicado anteriormente continua sendo do Via Parque; não o utilize com registros comerciais reais do Bossa Nova.
