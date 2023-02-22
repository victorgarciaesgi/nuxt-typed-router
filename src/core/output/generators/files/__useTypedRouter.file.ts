export function createUseTypedRouterFile(): string {
  return /* typescript */ `
  
  import { useRouter as defaultRouter } from '#app';
  import type { TypedRouter } from './__router';

  /** 
   * Typed clone of \`useRouter\`
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const router = useRouter();
   * \`\`\`
   */
  export function useRouter(): TypedRouter {
    const router = defaultRouter();

    return router;
  };

  `;
}
