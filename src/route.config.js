import navConfig from './nav.config.json';

const routes = [
  {
    path: '/guide',
    name: '指南',
    redirect: '/guide/usage',
    component: () => import(`./views/guide.vue`),
    children: [
      {
        path: 'usage',
        name: '使用指南',
        component: () => import(`./views/usage.vue`),
      },
      {
        path: 'dev',
        name: '开发指南',
        component: () => import(`./views/dev.vue`),
      },
    ],
  },
];

const router = {
  path: '/comps',
  name: '组件',
  component: () => import(`./views/comps.vue`),
  redirect: '/comps/',
  children: [],
};

navConfig.index[1].groups.forEach(group => {
  group.list.forEach(item => {
    router.children.push({
      path: item.filename,
      name: item.filename,
      meta: { title: item.title },
      component: () => import(`./docs/${item.filename}.md`),
    });
  });

  router.redirect = router.redirect += router.children?.[0]?.path;

  routes.push(router);
});

const defaultPath = {
  path: `/`,
  meta: { title: '首页' },
  name: 'home',
  component: () => import('./views/index.vue'),
};

routes.push(defaultPath);
routes.concat([
  {
    path: '/',
    redirect: defaultPath,
  },
  {
    path: '*',
    redirect: defaultPath,
  },
]);

console.log(routes);

export default routes;
