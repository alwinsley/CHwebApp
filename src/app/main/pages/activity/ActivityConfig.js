import Activity from './Activity';
import { FuseLoadable } from '@fuse';


export const ActivityConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/activity',
      component: Activity
    },
    {
      path: '/',
      exact: true,
      component: Activity
    },
    // {
    //   path: '/',
    //   exact: true,
    //   component: FuseLoadable({
    //     loader: () => import('./Activity')
    //   })
    // },
  ]
};

/**
 * Lazy load Activity
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: FuseLoadable({
                loader: () => import('./Example')
            })
        }
    ]
};
*/
