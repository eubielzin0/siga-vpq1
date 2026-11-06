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
- As migrations `001` a `004` foram aplicadas, seguidas de mudanças de apuração financeira por POS/Sistema e leitura compartilhada entre auditores autenticados. Agora há sete tabelas operacionais (incluindo `pos_terminais` e `apuracoes`), todas com RLS, e dois buckets privados. **As migrações financeiras já estão no Supabase, mas seu script de reprodução completo ainda precisa ser versionado no repositório.**
- Em 05/11/2026 o cadastro foi atualizado para **47 registros**, **46 ativos**, **1 inativo**, **38 com COLETA SIM**, **40 com INFORMA SIM**, **27 com NAPP SIM**, **25 com POS SIM**, **34 com PRESENCIAL SIM**. Os **47 LUCs** e **47 instrumentos** foram preenchidos e verificados como únicos.
- Os dois registros BAURUCAS foram preservados: código interno BNM-002 (ativo) e BNM-003 (inativo). Códigos BNM-001 a BNM-047 são identificadores internos, **não são LUC**. A referência Xian antes genérica passou a **Xian [Restaurante]**, LUC 6000; incluído **Xian [Bar]**, LUC Q-13, como registro distinto.
- Os **47 LUCs e instrumentos estão completos**; **pavimentos, blocos e sequência física da rota** continuam pendentes. A ordenação atual é provisória e não corresponde a uma rota física validada.
- Por confidencialidade operacional, o arquivo de dados/classificações **não foi publicado** neste repositório público. Os registros estão no Supabase privado.
- Em 06/11/2026 há **um coordenador** e **um auditor de fechamento** autenticados. O perfil do auditor de fechamento foi corrigido para seu nome completo, mantendo `papel=auditor`. Senhas não são guardadas em arquivos públicos nem no localStorage.

## Sequência de implantação

1. **Concluído:** projeto separado Supabase criado na organização autorizada, custo informado pela plataforma: US$ 0/mês no momento da criação.
2. **Parcial:** migrations `001` a `004` e estruturas de apuração implantadas. O advisor de segurança registrou aviso de proteção contra senhas vazadas desabilitada (não houve alerta de RLS nas tabelas novas). Testes ponta a ponta com usuário real ainda pendentes.
3. **Parcial:** coordenador e auditor de fechamento cadastrados. O backend `supabase/functions/admin-criar-auditor/index.ts` segue disponível para futuras contas; novos cadastros devem usar o Auth Admin oficial. É necessário confirmar/gerenciar as senhas em fluxo seguro, sem armazená-las no código.
4. **Parcialmente concluído:** 47 lojas BNM e suas classificações, LUCs e instrumentos cadastrados no Supabase privado. Restam pavimentos, blocos e ordem da rota física.
5. **Concluído e publicado em ambiente de teste:** `https://siga-alqia-bnm-teste.vercel.app`. Loja ativa com coleta SIM aparece na rota provisória; LUC/instrumento discretos abaixo do nome e painel do coordenador com cadastro em cartões, filtros, pesquisa e atalhos. O fluxo permite retomar e reenviar um turno. Evidências podem ser baixadas no próprio cartão do mês via ZIP `Mês/Dia/Loja/POS ou Sistema/foto.jpg`.
6. Testar em navegador real login do auditor, upload POS/Sistema com identificação individual do terminal e valores manuais, conciliação diária, permissões RLS, assinaturas temporárias e ZIP por mês. A apuração financeira atual só inclui valores com foto vinculada; o nome e cargo do auditor já estão atualizados no perfil. A foto de perfil deve ser adicionada no bucket privado pelo próprio app.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Banco do SIGA BNM:** https://supabase.com/dashboard/project/nvtmwabvrukyidusmfdg. **Teste publicado:** https://siga-alqia-bnm-teste.vercel.app. A API oficial de autenticação está configurada e a função Edge `admin-criar-auditor` está ativa; o cadastro de usuários ainda requer confirmação manual pelo coordenador no painel. **Nota:** o ZIP é baixado pelo navegador e salvo no computador mediante ação do usuário; não há sincronização automática de pastas para o PC. A branch VPQ permanece separada.

## Apuração financeira e POS — 06/11/2026

- **Opção operacional:** apenas POS que tiveram fechamento no dia precisam ser selecionadas e fotografadas. Não há exigência de fotografar todos os terminais cadastrados.
- **Cadastro de terminal:** um registro por LUC e apelido, com adquirente e código opcionais; novos terminais entram como `validado=false` até conferência de liderança. A planilha de POS recebida apresentou divergências; **nenhum terminal foi importado automaticamente**.
- **Lançamento:** selecionar POS (ou Sistema), digitar valor (R$), fotografar e enviar. Cada operação + terminal + dia possui um único valor financeiro; evidências adicionais ficam vinculadas à mesma apuração.
- **Conciliação:** resumo por dia, operação, terminal, total POS e total Sistema; diferença apenas quando há ambos. Valores sem foto associada não entram nos totais. Fotos anteriores à implantação não possuem valores e não são estimadas por OCR.
- **Permissões:** somente usuários autenticados do SIGA BNM acessam apurações e metadados de evidências para continuidade entre turnos; alteração das apurações permanece vinculada ao auditor responsável ou ao coordenador. Fotos privadas mantêm as regras do bucket.
- **ZIP:** `mês / dia / loja / POS / terminal / foto.jpg`, ou `mês / dia / loja / Sistema / foto.jpg`. Isso separa relatórios de POS individuais.
- **Limitações:** câmera e valor exigem internet para envio; não há leitura automática de valores de fotografias nem integração Cittera. Testes funcionais completos em dispositivos reais e trilha de auditoria de alterações monetárias ainda necessários antes do uso operacional.
