import { useRouter, navigateTo, useLocalePath, useLocaleRoute } from '@typed-router';
import { expectTypeOf, vi } from 'vitest';
import type { LocationQuery } from 'vue-router';
import { required, optional } from '../../../../utils/typecheck';
import { TypedNuxtLink } from '../../.nuxt/typed-router/typed-router';

// Given

const localePath = useLocalePath();
const router = useRouter();
const NuxtLink: TypedNuxtLink = vi.fn() as any;
