import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder } from "react-native";

const order = 1;

const AnimationTestComp = ({ movingCude, setMovingCude, count }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log(pan.y);
        pan.setOffset({
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        setMovingCude(pan.y);
        Animated.event(
          [
            null,
            {
              dy: pan.y,
            },
          ],
          {
            useNativeDriver: false,
          }
        )(e, gestureState);
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();

        if (pan.y._value >= 100) {
          Animated.spring(pan.y, {
            toValue: 200,
            speed: 15,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan.y, {
            toValue: 0,
            speed: 15,
            useNativeDriver: false,
          }).start();
        }

        console.log(pan.y);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default AnimationTestComp;
