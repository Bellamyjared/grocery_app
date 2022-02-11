import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";

import { GetCategory } from "../dbRequests/Category";

const CATEGORY_HEIGHT = 80;
const SCROLL_HEIGHT_THRESHOLD = CATEGORY_HEIGHT;

function Category({ category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );
}

const MovableSong = ({ id, category, positions, scrollY, categoryCount }) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * CATEGORY_HEIGHT);
  const screenDimensions = useWindowDimensions();

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * CATEGORY_HEIGHT);
        }
      }
    },
    [moving]
  );

  const objectMove = (object, from, to) => {
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

  const boundry = (value, lowerBound, upperBound) => {
    "worklet";
    return Math.max(lowerBound, Math.min(value, upperBound));
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(e) {
      const positionY = e.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        //scroll up
        scrollY.value = withTiming(0, { duration: 200 });
      } else if (
        positionY >=
        scrollY.value + screenDimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        //scroll down
        const contentHeight = categoryCount * CATEGORY_HEIGHT;
        const maxScroll = contentHeight - screenDimensions.height;
        scrollY.value = withTiming(maxScroll, {
          duration: 1500,
          easing: Easing.cubic,
        });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - CATEGORY_HEIGHT - 25, {
        duration: 1,
      });

      const newPosition = boundry(
        Math.floor(positionY / (CATEGORY_HEIGHT + 25)),
        0,
        categoryCount - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * CATEGORY_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: "white",
      zIndex: moving ? 1 : 0,
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
          <Category category={category} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default function MoveAbleList() {
  const [categories, setCategories] = useState([]);
  const positions = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  );

  function listToObject(list) {
    const values = Object.values(list);
    const object = {};

    for (let i = 0; i < values.length; i++) {
      object[values[i]._id] = i;
    }
    return object;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    handleGetItems();
  }, []);

  const handleGetItems = async () => {
    data = await GetCategory();
    positions.value = listToObject(data);
    setCategories(data);
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const ExampleWithHoc = gestureHandlerRootHOC(() => (
    <>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "white",
        }}
        contentContainerStyle={{
          height: categories.length * CATEGORY_HEIGHT,
        }}
      >
        {categories.map((cat) => (
          <MovableSong
            key={cat._id}
            id={cat._id}
            category={cat.category}
            positions={positions}
            scrollY={scrollY}
            categoryCount={categories.length}
          />
        ))}
      </Animated.ScrollView>
    </>
  ));
  return <ExampleWithHoc />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#DEDEDE",
    paddingTop: 25,
  },
  categoryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    paddingLeft: 30,
  },
});
