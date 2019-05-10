import { FuseLoadable } from '@fuse';

export const TeamMemberPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/team_member/list',
      component: FuseLoadable({
        loader: () => import('./TeamMemberList')
      })
    },
  ]
};
