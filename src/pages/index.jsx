import React from 'react';

import PageTemplate from '../layout/PageTemplate';

import NewestPosts from '../sections/NewestPosts';
import GamesTeaser from '../sections/GamesTeaser';
import CraftTeaser from '../sections/CraftTeaser';

// import OrbCatcher from '../the-crypt/orb-catcher';

export default function Home() {
  return(
    <PageTemplate slug="home">
      <NewestPosts />
      <GamesTeaser />  
      <CraftTeaser />  
    </PageTemplate>
  );
}