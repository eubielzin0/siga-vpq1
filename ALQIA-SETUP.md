# SIGA ALQIA 2.0 — Bossa Nova Mall

Ramificação de desenvolvimento separada da versão original do Via Parque. A identidade visual existente será preservada. **Nenhum dado antigo deve ser migrado automaticamente.**

## O que está preparado

- `supabase/001_siga_alqia_bnm.sql`: esquema inicial do Supabase (perfis, lojas, coletas, turnos, evidências, RLS e armazenamento privado).
- `supabase/002_siga_alqia_indexes.sql`: índices de desempenho.
- `supabase/003_cadastro_bnm_classificacoes.sql`: campos de classificação NAPP, INFORMA, COLETA, POS, PRESENCIAL e cadastro com LUC opcional.
- `supabase/004_instrumento_bnm.sql`: campo instrumento contratual com índice único.
- Perfis compatíveis com o código original: `coordenador` (líder/ADM) e `auditor`.
- Novos usuários só podem ser criados pelo fluxo autorizado do Supabase Auth. Apenas o coordenador pode acessar a aba **Acessos** para criar contas de auditores; o backend sempre atribui `papel = auditor`. O perfil de coordenador existente é administrado no banco.
- O projeto Supabase **siga-alqia-bnm** foi criado em 05/11/2026 e está ativo (região São Paulo). Referência: `nvtmwabvrukyidusmfdg`.
- As migrations `001`, `002`, `003` e `004` foram aplicadas com sucesso no novo banco. Há cinco tabelas operacionais, RLS em todas elas e dois buckets privados.
- Em 05/11/2026 o cadastro foi atualizado para **47 registros**, **46 ativos**, **1 inativo**, **38 com COLETA SIM**, **40 com INFORMA SIM**, **27 com NAPP SIM**, **25 com POS SIM**, **34 com PRESENCIAL SIM**. Os **47 LUCs** e **47 instrumentos** foram preenchidos e verificados como únicos.
- Os dois registros BAURUCAS foram preservados: código interno BNM-002 (ativo) e BNM-003 (inativo). Códigos BNM-001 a BNM-047 são identificadores internos, **não são LUC**. A referência Xian antes genérica passou a **Xian [Restaurante]**, LUC 6000; incluído **Xian [Bar]**, LUC Q-13, como registro distinto.
- Os **47 LUCs e instrumentos estão completos**; **pavimentos, blocos e sequência física da rota** continuam pendentes. A ordenação atual é provisória e não corresponde a uma rota física validada.
- Por confidencialidade operacional, o arquivo de dados/classificações **não foi publicado** neste repositório público. Os registros estão no Supabase privado.
- Em 06/11/2026 há **um coordenador autenticado** e ainda não há auditor novo confirmado. O login do auditor de fechamento será criado após o coordenador confirmar o cadastro na aba **Acessos**. Senhas não são gravadas em arquivos públicos nem no localStorage.

## Sequência de implantação

1. **Concluído:** projeto separado Supabase criado na organização autorizada, custo informado pela plataforma: US$ 0/mês no momento da criação.
2. **Concluído:** migrations `001` a `004` instaladas. Alertas de segurança Supabase: nenhum. Testes de ponta a ponta com usuários reais: pendentes.
3. **Parcial:** um coordenador ativo, autorizado a acompanhar todos os auditores. Próxima ação: cadastrar o auditor de fechamento pela aba **Acessos**. O backend `supabase/functions/admin-criar-auditor/index.ts` usa `auth.admin.createUser`, exige um token válido e confirmação do papel de coordenador; o login/cargo são definidos no painel e a senha forte gerada é exibida uma única vez.
4. **Parcialmente concluído:** 47 lojas BNM e suas classificações, LUCs e instrumentos cadastrados no Supabase privado. Restam pavimentos, blocos e ordem da rota física.
5. **Concluído e publicado em ambiente de teste:** `https://siga-alqia-bnm-teste.vercel.app`. Loja ativa com coleta SIM aparece na rota provisória; LUC/instrumento discretos abaixo do nome e painel do coordenador com cadastro em cartões, filtros, pesquisa e atalhos. O fluxo permite retomar e reenviar um turno. Evidências podem ser baixadas no próprio cartão do mês via ZIP `Mês/Dia/Loja/POS ou Sistema/foto.jpg`.
6. Testar em navegador real login do novo auditor, restrição de acesso (RLS), upload POS/Sistema, assinaturas temporárias e ZIP por mês (inclusive download direto do card). A API de criação de usuários foi implantada, mas ainda precisa de teste autenticado de ponta a ponta. A foto do novo auditor deve ser enviada à área privada de avatares pelo próprio app, não a um repositório público.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Banco do SIGA BNM:** https://supabase.com/dashboard/project/nvtmwabvrukyidusmfdg. **Teste publicado:** https://siga-alqia-bnm-teste.vercel.app. A API oficial de autenticação está configurada e a função Edge `admin-criar-auditor` está ativa; o cadastro de usuários ainda requer confirmação manual pelo coordenador no painel. **Nota:** o ZIP é baixado pelo navegador e salvo no computador mediante ação do usuário; não há sincronização automática de pastas para o PC. A branch VPQ permanece separada.
