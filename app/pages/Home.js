import React from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';

function Home() {
  return (
    <Container>
      <StatusBar translucent={false} barStyle="light-content" />
      <Logo />
      <View />
    </Container>
  );
}

export default Home;
