<script lang="tsx">
import { _NuxtLink } from '~~/.nuxt/typed-router/typed-router';

declare const NuxtLink: _NuxtLink;

export default defineComponent({
  render() {
    return (
      <>
        <NuxtLink to={{ name: 'index' }}></NuxtLink>
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'blablabla' }}></NuxtLink>;{/* @ts-expect-error */}
        <NuxtLink to={{ name: 'blablabla' }}></NuxtLink>;{/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-id', params: { foo: 'bar' } }}></NuxtLink>;
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-foo-bar', params: { bar: 1 } }}></NuxtLink>;
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-slug', params: { slug: 1 } }}></NuxtLink>;
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-one-foo-two', params: { one: 1 } }}></NuxtLink>;
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-one-foo-two' }}></NuxtLink>
        {/* @ts-expect-error */}
        <NuxtLink to={{ name: 'user-id-slug', params: { id: 1 } }}></NuxtLink>
      </>
    );
  },
});
</script>
