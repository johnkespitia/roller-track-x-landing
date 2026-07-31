#!/usr/bin/env node
/**
 * scripts/check-api.ts
 *
 * Smoke test contra el endpoint público de leads del Laravel API.
 * Útil para desarrollo local y para CI.
 *
 * Uso (Node 20+):
 *   node --env-file=.env.local --import tsx scripts/check-api.ts
 *   node --env-file=.env.local --import tsx scripts/check-api.ts --type school
 *
 * O con el atajo npm:
 *   npm run check-api
 */

import { pingLeadsEndpoint, submitLead, type LeadType } from "../lib/leads";

function parseArgs(): { type: LeadType } {
  const args = process.argv.slice(2);
  const out: { type: LeadType } = { type: "contact" };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--type" && args[i + 1]) {
      out.type = args[i + 1] as LeadType;
      i++;
    }
  }
  return out;
}

async function main(): Promise<void> {
  const { type } = parseArgs();

  console.log("→ ping…");
  const ping = await pingLeadsEndpoint();
  console.log("  ping:", ping);

  console.log(`→ submit (type=${type})…`);
  const result = await submitLead({
    type,
    name: "Smoke Test",
    email: `smoke+${Date.now()}@example.com`,
    phone: "+57 300 000 0000",
    city: "Bogotá",
    interest: "smoke test",
    message: "Esto es un test automatizado",
    source_page: "/__smoke",
    consent: true,
  });
  console.log("  result:", result);

  if (!result.ok) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
