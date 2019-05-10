import { FuseLoadable } from '@fuse';

export const Register2PageConfig = {
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
      path: '/register',
      component: FuseLoadable({
        // loader: () => import('./Register2Page')
        loader: () => import('./RegisterPage')
      })
    }
  ]
};
