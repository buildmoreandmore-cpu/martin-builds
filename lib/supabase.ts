import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://lnvzvmjhulntglbjyryz.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let _client: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    if (!_client) {
      _client = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    }
    return (_client as Record<string | symbol, unknown>)[prop];
  },
});
