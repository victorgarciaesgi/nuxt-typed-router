export const baseOutputExpectedResult = {
  routesObjectTemplate:
    "{'index': 'index' as const,childTwo:{'childTwoId': 'parent-child-two-id' as const,'childTwoChildOneSubOne': 'parent-child-two-child-one-sub-one' as const,'index': 'parent-child-two' as const,profile:{id:{slug:{'idSlugArticles': 'parent-child-two-profile-id-slug-articles' as const,'index': 'parent-child-two-profile-id-slug' as const,},'index': 'parent-child-two-profile-id' as const,},'index': 'parent-child-two-profile' as const,},},'rootPage': 'rootPage' as const,}",
  routesDeclTemplate:
    '{"index": "index","childTwo":{"childTwoId": "parent-child-two-id","childTwoChildOneSubOne": "parent-child-two-child-one-sub-one","index": "parent-child-two","profile":{"id":{"slug":{"idSlugArticles": "parent-child-two-profile-id-slug-articles","index": "parent-child-two-profile-id-slug"},"index": "parent-child-two-profile-id"},"index": "parent-child-two-profile"}},"rootPage": "rootPage"}',
  routesList: [
    'index',
    'parent-child-two-id',
    'parent-child-two-child-one-sub-one',
    'parent-child-two',
    'parent-child-two-profile-id-slug-articles',
    'parent-child-two-profile-id-slug',
    'parent-child-two-profile-id',
    'parent-child-two-profile',
    'rootPage',
  ],
  routesParams: [
    { name: 'index', params: [] },
    {
      name: 'parent-child-two-id',
      params: [{ key: 'id', notRequiredOnPage: false, required: true }],
    },
    { name: 'parent-child-two-child-one-sub-one', params: [] },
    { name: 'parent-child-two', params: [] },
    {
      name: 'parent-child-two-profile-id-slug-articles',
      params: [
        { key: 'id', notRequiredOnPage: false, required: false },
        { key: 'slug', notRequiredOnPage: false, required: false },
      ],
    },
    {
      name: 'parent-child-two-profile-id-slug',
      params: [
        { key: 'id', notRequiredOnPage: false, required: false },
        { key: 'slug', notRequiredOnPage: false, required: true },
      ],
    },
    {
      name: 'parent-child-two-profile-id',
      params: [{ key: 'id', notRequiredOnPage: false, required: true }],
    },
    { name: 'parent-child-two-profile', params: [] },
    { name: 'rootPage', params: [] },
  ],
};
