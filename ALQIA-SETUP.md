# SIGA ALQIA 2.0 — Bossa Nova Mall

Ramificação de desenvolvimento separada da versão original do Via Parque. A identidade visual existente será preservada. **Nenhum dado antigo deve ser migrado automaticamente.**

## O que está preparado

- `supabase/001_siga_alqia_bnm.sql`: esquema inicial para Supabase NOVO (perfis, lojas/LUC, coletas, turnos, evidências, políticas de acesso e armazenamento privado).
- Perfis compatíveis com o código original: `coordenador` (líder/ADM) e `auditor`.
- No novo banco, novos usuários recebem inicialmente o perfil `auditor`. Os dois líderes serão promovidos pelo administrador autorizado no painel/SQL, nunca pelo código público.
- O projeto Supabase **siga-alqia-bnm** foi criado em 05/11/2026 e está ativo (região São Paulo). Referência: `nvtmwabvrukyidusmfdg`.
- Os scripts `001` e `002` foram aplicados com sucesso no novo banco. O banco tem cinco tabelas operacionais, RLS em todas elas, dois buckets privados e zero usuários/lojas até que cadastros sejam autorizados.
- As quatro contas **ainda não foram criadas**; faltam os e-mails individuais dos dois líderes e dois auditores.

## Sequência de implantação

1. **Concluído:** projeto separado Supabase criado na organização autorizada, custo informado pela plataforma: US$ 0/mês no momento da criação.
2. **Concluído:** migrations `001` e `002` instaladas. Alertas de segurança Supabase: nenhum. Testes de ponta a ponta com usuários reais: pendentes.
3. Criar quatro usuários autenticados com e-mails reais (dois líderes e dois auditores), conferir o perfil gerado por trigger e promover os líderes com acesso administrativo.
4. Cadastrar as lojas BNM usando LUC, nome, pavimento, bloco e ordem da rota. Os nomes e rotas reais precisam ser confirmados antes de ativar a coleta.
5. Adaptar `index.html` para apontar ao projeto novo e ler `public.lojas` em vez da constante VPQ; revisar strings de identidade/relatórios e `manifest.webmanifest`.
6. Testar login, RLS, upload de POS/Sistema, visualização com assinaturas temporárias e exportação ZIP do dia no PC, antes de usar documentos reais.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Banco do SIGA BNM:** https://supabase.com/dashboard/project/nvtmwabvrukyidusmfdg (ativo). O front-end na ramificação ainda precisa apontar para esse banco e usar a tabela BNM de lojas. O aplicativo publicado no link antigo continua do Via Parque; não o utilize com registros comerciais reais do Bossa Nova.
