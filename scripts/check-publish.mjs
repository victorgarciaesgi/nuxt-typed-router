import { readFileSync } from 'node:fs';

// Guard against publishing with npm/yarn/bun.
// Only `pnpm publish` rewrites `catalog:` specifiers into real version ranges;
// publishing with another client ships an uninstallable package (see #163, #170).
const userAgent = process.env.npm_config_user_agent ?? '';

if (!userAgent.startsWith('pnpm/')) {
  console.error(
    '\n✖ nuxt-typed-router must be published with `pnpm publish` so `catalog:` dependencies get resolved.\n' +
      `  Detected client: ${userAgent || 'unknown'}\n`
  );
  process.exit(1);
}

// Guard against exact-pinned runtime dependencies.
// An exact pin can't be moved by consumers, so they can't pick up security
// patches through normal updates (see #168). Use semver ranges instead.
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workspace = readFileSync(new URL('../pnpm-workspace.yaml', import.meta.url), 'utf8');

function resolveCatalog(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\/@-]/g, '\\$&');
  const match = workspace.match(new RegExp(`^\\s+['"]?${escaped}['"]?:\\s*['"]?([^'"\\s#]+)`, 'm'));
  return match?.[1];
}

const pinned = Object.entries(pkg.dependencies ?? {})
  .map(([name, spec]) => [name, spec === 'catalog:' ? resolveCatalog(name) : spec])
  .filter(([, spec]) => !spec || /^\d+\.\d+\.\d+([-+].*)?$/.test(spec));

if (pinned.length) {
  console.error(
    '\n✖ Runtime dependencies must use semver ranges, not exact versions (see #168):\n' +
      pinned
        .map(([name, spec]) => `  - ${name}: ${spec ?? 'unresolved catalog entry'}`)
        .join('\n') +
      '\n'
  );
  process.exit(1);
}
