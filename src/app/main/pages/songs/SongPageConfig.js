import Songs from './Song';
import SongMedia from './SongMedia';
import SongLyrics from './SongLyrics';
import SongList from './list/SongList';
import SongMediaList from './mediaList/SongList';
import CreateSong from './CreateSong'; 
import CreateSongMedia from './CreateSongMedia'; 

export const SongPageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      exact: true,
      path: '/songs/:sid/lyrics',
      component: SongLyrics
    },
    {
      exact: true,
      path: '/songs/details/:id',
      component: Songs
    },
    {
      exact: true,
      path: '/songs/:sid/media/list',
      component: SongMediaList
    },
    {
      exact: true,
      path: '/songs/:sid/media/create',
      component: CreateSongMedia
    },
    {
      exact: true,
      path: '/songs/:sid/media/:mid',
      component: SongMedia
    },
    {
      exact: true,
      path: '/songs',
      component: SongList
    },
    {
      exact: true,
      path: '/songs/create',
      component: CreateSong,
    },
  ]
};
