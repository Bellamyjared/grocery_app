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

const MoveableItem = ({
  id,
  item,
  positions,
  scrollY,
  itemCount,
  item_Height,
  header_Height,
  CategoryItemIcons,
  disabled,
  handleIconPress,
}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * item_Height);
  const screenDimensions = useWindowDimensions();
  const SCROLL_HEIGHT_THRESHOLD = item_Height;

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
          top.value = withSpring(currentPosition * item_Height);
        }
      }
    },
    [moving]
  );
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~gestureHandler~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const gestureHandler = useAnimatedGestureHandler({
    onStart(e) {
      if (disabled != true) {
        runOnJS(setMoving)(true);
      }
    },
    onActive(e) {
      if (disabled != true) {
        const positionY = e.absoluteY + scrollY.value - header_Height;

        if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
          //scroll up
          scrollY.value = withTiming(0, { duration: 70 });
        } else if (
          positionY >=
          scrollY.value +
            screenDimensions.height -
            SCROLL_HEIGHT_THRESHOLD -
            header_Height
        ) {
          //scroll down
          const contentHeight = itemCount * item_Height;
          const maxScroll = contentHeight - screenDimensions.height;
          scrollY.value = withTiming(maxScroll, {
            duration: 70,
          });
        } else {
          cancelAnimation(scrollY);
        }

        // added padding of the category item at the end to get it to align better on drag start
        top.value = withTiming(positionY - item_Height + 25, {
          duration: 1,
        });

        const newPosition = boundary(
          Math.floor(positionY / item_Height),
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
      }
    },
    onFinish() {
      if (disabled != true) {
        top.value = positions.value[id] * item_Height;
        runOnJS(setMoving)(false);
      } else {
        runOnJS(handleIconPress)(item, id);
      }
    },
  });
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //  ~~~~~~~~~~Styles for animated view below
  const animatedStyle = useAnimatedStyle(() => {
    return {
      flexDirection: "row",
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
        <Animated.View style={{ width: "80%", maxWidth: "80%" }}>
          {/* ~~~~~~ Item ~~~~~~~~~ */}
          <View style={disabled ? styles.BorderOnDisabled : styles.container}>
            <Text style={styles.itemText}>{item}</Text>
            {disabled ? (
              <View style={{ paddingLeft: 20 }}>
                {CategoryItemIcons(id, item)}
              </View>
            ) : (
              <></>
            )}
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 12.5,
    paddingBottom: 12.5,
  },
  BorderOnDisabled: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
