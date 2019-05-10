import { FuseLoadable } from '@fuse';

export const ProfilePageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/profile',
      component: FuseLoadable({
        loader: () => import('./ProfilePage')
      })
    }
  ]
};
