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
