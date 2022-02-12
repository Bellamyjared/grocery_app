import React, { useState } from "react";
import { Text, useWindowDimensions, View, StyleSheet } from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const ITEM_HEIGHT = 75;
const SCROLL_HEIGHT_THRESHOLD = ITEM_HEIGHT;

const MoveableItem = ({ id, item, positions, scrollY, itemCount }) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const screenDimensions = useWindowDimensions();

  // ~~~~~~~~~~~~~~~functions used in gestureHandler~~~~~~~~~~~~~~~~~
  const boundary = (value, lowerBound, upperBound) => {
    "worklet";
    return Math.max(lowerBound, Math.min(value, upperBound));
  };

  const changeItemOrder = (object, from, to) => {
    "worklet";
    const newObject = Object.assign({}, object);

    for (const id in object) {
      if (object[id] === from) {
        newObject[id] = to;
      }

      if (object[id] === to) {
        newObject[id] = from;
      }
    }

    return newObject;
  };
  // change the position of none-moving items, and animate it
  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * ITEM_HEIGHT);
        }
      }
    },
    [moving]
  );
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~gestureHandler~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const gestureHandler = useAnimatedGestureHandler({
    onStart(e) {
      runOnJS(setMoving)(true);
    },
    onActive(e) {
      const positionY = e.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        //scroll up
        scrollY.value = withTiming(0, { duration: 70 });
      } else if (
        positionY >=
        scrollY.value + screenDimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        //scroll down
        const contentHeight = itemCount * ITEM_HEIGHT;
        const maxScroll = contentHeight - screenDimensions.height;
        scrollY.value = withTiming(maxScroll, {
          duration: 70,
        });
      } else {
        cancelAnimation(scrollY);
      }

      // added padding of the category item at the end to get it to align better on drag start
      top.value = withTiming(positionY - ITEM_HEIGHT + 25, {
        duration: 1,
      });

      const newPosition = boundary(
        Math.floor(positionY / ITEM_HEIGHT),
        0,
        itemCount - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = changeItemOrder(
          positions.value,
          positions.value[id],
          newPosition
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //  ~~~~~~~~~~Styles for animated view below
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      // has to be background and not opacity because elevation doesn't work with opacity
      backgroundColor: "rgba(255,255,255,0.0)",
      zIndex: moving ? 1 : 0,
      // for android
      elevation: moving ? 2 : 0,
      // for IOS
      shadowColor: "black",
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: moving ? 0.2 : 0,
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{ maxWidth: "80%" }}>
          {/* ~~~~~~ Item ~~~~~~~~~ */}
          <View style={styles.container}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~ */}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default MoveableItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 12.5,
    paddingBottom: 12.5,
  },
});
