# SIGA ALQIA 2.0 — Bossa Nova Mall

Ramificação de desenvolvimento separada da versão original do Via Parque. A identidade visual existente será preservada. **Nenhum dado antigo deve ser migrado automaticamente.**

## O que está preparado

- `supabase/001_siga_alqia_bnm.sql`: esquema inicial para Supabase NOVO (perfis, lojas/LUC, coletas, turnos, evidências, políticas de acesso e armazenamento privado).
- Perfis compatíveis com o código original: `coordenador` (líder/ADM) e `auditor`.
- No novo banco, novos usuários recebem inicialmente o perfil `auditor`. Os dois líderes serão promovidos pelo administrador autorizado no painel/SQL, nunca pelo código público.
- As quatro contas ainda **não foram criadas**; ainda falta definir os e-mails e criar o projeto Supabase na organização escolhida.

## Sequência de implantação

1. Criar um projeto Supabase SEPARADO para o Bossa Nova Mall na organização confirmada pelo responsável; verificar eventuais custos antes de aprová-los.
2. Aplicar e testar o SQL em **ambiente novo**, conferir os avisos de segurança e as regras RLS; não executar no banco VPQ.
3. Criar quatro usuários autenticados com e-mails reais (dois líderes e dois auditores), conferir o perfil gerado por trigger e promover os líderes com acesso administrativo.
4. Cadastrar as lojas BNM usando LUC, nome, pavimento, bloco e ordem da rota. Os nomes e rotas reais precisam ser confirmados antes de ativar a coleta.
5. Adaptar `index.html` para apontar ao projeto novo e ler `public.lojas` em vez da constante VPQ; revisar strings de identidade/relatórios e `manifest.webmanifest`.
6. Testar login, RLS, upload de POS/Sistema, visualização com assinaturas temporárias e exportação ZIP do dia no PC, antes de usar documentos reais.
7. Implementar persistência offline de fotografias via IndexedDB e recuperação de sincronização; a fila atual do VPQ armazena apenas marcações.
8. Integração com Cittera apenas após validação/homologação da TI e definição de mecanismo contra duplicidade.

**Atenção:** o banco criado pelo SQL ainda não está implantado. O aplicativo publicado no link antigo ainda é do Via Parque; não o utilize com registros comerciais reais do Bossa Nova.
