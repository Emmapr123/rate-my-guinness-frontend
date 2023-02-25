import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  shimmer: {
    overflow: 'hidden',
    backgroundColor: '#181818',
  },
});

const SCREEN_WIDTH = Dimensions.get('screen').width;
const START = -1;
const END = 1;
const DURATION = 2000;
const COLORS = ['#181818', '#D8C060', '#181818'];
const LOCATIONS = [0.3, 0.5, 0.7];
const ANIMATION = new Animated.Value(START);

const runAnimation = () => {
  ANIMATION.setValue(START);
  Animated.timing(ANIMATION, {
    toValue: END,
    duration: DURATION,
    // @ts-ignore
    easing: Easing.linear(),
    useNativeDriver: true,
  }).start(runAnimation);
};

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
});

runAnimation();

const Shimmer = ({ width, height }: {width: number, height: number}) => {
  const [positionX, setPositionX] = useState(null);
  let viewRef: any = null;
  return (
    <View
      style={[styles.shimmer, { width, height }]}
      ref={ref => (viewRef = ref)}
      onLayout={() => {
        if (viewRef) {
          viewRef.measure((_x: any, _y: any, _width: number, _height: number, pageX: React.SetStateAction<null>, _pageY: any) => {
            setPositionX(pageX);
          });
        }
      }}>
      {positionX !== null && (
        <Animated.View
          style={{
            flex: 1,
            left: -positionX,
            transform: [{ translateX: linear }],
          }}>
          <LinearGradient
            style={{ flex: 1, width: SCREEN_WIDTH }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={LOCATIONS}
            colors={COLORS}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Shimmer;
