import { FuseLoadable } from '@fuse';

export const Login2PageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  routes: [
    {
      path: '/login',
      exact: true,
      component: FuseLoadable({
        loader: () => import('./Login2Page')
      })
    }
  ]
};
