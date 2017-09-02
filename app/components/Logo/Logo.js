import React from 'react';
import { View, Text, Keyboard, Animated, Platform } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };

    this.keyboardShow = this.keyboardShow.bind(this);
    this.keyboardHide = this.keyboardHide.bind(this);
  }

  componentDidMount() {
    let showListener = 'keyboardWillShow';
    let hideListener = 'keyboardWillHide';

    if (Platform.OS === 'android') {
      showListener = 'keyboardDidShow';
      hideListener = 'keyboardDidHide';
    }

    this.keyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
  }

  componentWillUnMount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow() {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  }

  keyboardHide() {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  }

  render() {
    const containerImageStyles = [
      styles.containerImage,
      {
        width: this.state.containerImageWidth,
        height: this.state.containerImageWidth,
      },
    ];

    const imageStyles = [
      styles.logo,
      {
        width: this.state.imageWidth,
      },
    ];

    return (
      <View style={styles.container}>
        <Animated.Image resizeMode="contain" style={containerImageStyles} source={require('./images/background.png')}>
          <Animated.Image resizeMode="contain" style={imageStyles} source={require('./images/logo.png')} />
        </Animated.Image>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
