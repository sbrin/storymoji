const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
      path: '',
      component: () => import('pages/Index.vue')
    },
    {
      path: 'storymoji',
      component: () => import('pages/storymoji/Index.vue'),
    },
    {
      path: 'storymoji/solo',
      component: () => import('pages/storymoji/StorySolo.vue')
    }, {
      path: 'storymoji/multi',
      component: () => import('pages/storymoji/StoryMultiplayer.vue')
    }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
