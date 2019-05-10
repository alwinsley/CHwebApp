// Dashboard menu item...

const navigationConfig = [
  {
    id: 'applications',
    // title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'activity-component',
        title: 'Home',
        type: 'item',
        icon: 'whatshot',
        url: '/activity'
      },
      {
        id: 'profile-component',
        title: 'Profile',
        type: 'item',
        icon: 'receipt',
        url: '/profile'
      },
      {
        id: 'price-component',
        title: 'Pricing',
        type: 'item',
        icon: 'attach_money',
        url: '/pricing'
      },
      {
        id: 'calendar-component',
        title: 'Calendar',
        type: 'item',
        icon: 'today',
        url: '/calendar'
      },
      {
        id: 'team-component',
        title: 'List of Teams',
        type: 'item',
        icon: 'account_box',
        url: '/team'
      },
      {
        id: 'team-member-component',
        title: 'Team Members',
        type: 'item',
        icon: 'account_box',
        url: '/team_member/list'
      },
      {
        id: 'song-component',
        title: 'Songs',
        type: 'item',
        icon: 'alarm',
        url: '/songs'
      },
    ]
  }
];



export default navigationConfig;
