import { FuseLoadable } from '@fuse';

export const PricingStyle1PageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/pricing',
      component: FuseLoadable({
        loader: () => import('./PricingWrapper')
      })
    }
  ]
};
