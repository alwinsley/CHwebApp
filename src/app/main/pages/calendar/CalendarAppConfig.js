import { FuseLoadable } from '@fuse';

export const CalendarAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/calendar',
      component: FuseLoadable({
        loader: () => import('./CalendarApp')
      })
    }
  ]
};
