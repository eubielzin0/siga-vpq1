import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://siga-alqia-bnm-teste.vercel.app",
  "https://siga-alqia-bnm-teste-eubielzin0-8413.vercel.app",
]);
const allowedRoles = new Set(["Auditor", "Auditor de Coleta", "Auditor de Fechamento"]);

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response("Origem não autorizada", { status: 403 });
  }
  const headers = {
    "Access-Control-Allow-Origin": origin || "https://siga-alqia-bnm-teste.vercel.app",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
    "Cache-Control": "no-store",
  };
  const reply = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return reply(405, { error: "Método não permitido." });

  const authHeader = req.headers.get("authorization") || "";
  if (!/^Bearer\s+\S+$/i.test(authHeader)) return reply(401, { error: "Entre com sua conta de coordenador." });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return reply(503, { error: "Configuração segura indisponível." });
  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  try {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const { data: authData, error: authError } = await admin.auth.getUser(token);
    if (authError || !authData?.user) return reply(401, { error: "Sessão expirada ou inválida." });
    const { data: caller, error: callerError } = await admin.from("profiles")
      .select("papel").eq("id", authData.user.id).single();
    if (callerError || caller?.papel !== "coordenador") {
      return reply(403, { error: "Somente o coordenador pode criar acessos." });
    }
    let payload: Record<string, unknown>;
    try { payload = await req.json(); }
    catch { return reply(400, { error: "Dados de cadastro inválidos." }); }
    const nome = String(payload.nome || "").trim().replace(/\s+/g, " ");
    const email = String(payload.email || "").trim().toLowerCase();
    const funcao = String(payload.funcao || "Auditor");
    const senha = String(payload.senha || "");
    if (nome.length < 5 || nome.length > 90 || !/^[\p{L}\s.'-]+$/u.test(nome)) {
      return reply(400, { error: "Informe o nome completo do auditor." });
    }
    if (!/^[a-z][a-z0-9.-]{2,60}@bossanovamall\.com$/.test(email)) {
      return reply(400, { error: "Use um e-mail no padrão @bossanovamall.com." });
    }
    if (!allowedRoles.has(funcao)) return reply(400, { error: "Função inválida." });
    if (senha.length < 16 || senha.length > 100 || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/\d/.test(senha)) {
      return reply(400, { error: "A senha precisa ter pelo menos 16 caracteres, letras maiúsculas, minúsculas e números." });
    }
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password: senha, email_confirm: true,
      user_metadata: { nome, funcao },
    });
    if (createError || !created.user) {
      return reply(409, { error: "Não foi possível criar a conta. Verifique se o e-mail já está em uso." });
    }
    const userId = created.user.id;
    const { data: profiles, error: profileError } = await admin.from("profiles")
      .upsert({ id: userId, nome, funcao, papel: "auditor" }, { onConflict: "id" })
      .select("id,papel");
    if (profileError || !profiles?.length || profiles[0].papel !== "auditor") {
      // Safe rollback: newly created account has not been used for any collection.
      await admin.auth.admin.deleteUser(userId);
      return reply(500, { error: "Não foi possível configurar o perfil. A criação foi revertida." });
    }
    return reply(201, { ok: true, email, nome, funcao, papel: "auditor" });
  } catch (error) {
    console.error("admin-criar-auditor:", error instanceof Error ? error.message : "erro inesperado");
    return reply(500, { error: "Erro temporário no cadastro. Tente novamente." });
  }
});
