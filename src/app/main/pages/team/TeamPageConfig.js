import { FuseLoadable } from '@fuse';

export const TeamPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/team/list',
      component: FuseLoadable({
        loader: () => import('./list/TeamList')
      })
    },
    {
      path: '/team/create',
      component: FuseLoadable({
        loader: () => import('./CreateTeam')
      })
    },
    {
      path: '/team',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./TeamWrapper')
      })
    }
  ]
};
