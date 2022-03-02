//  need to fix scrolling with an item or get rid of it

import React, { useState, useEffect } from "react";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import MoveableItem from "./MoveAbleItem";

export default function MoveAbleList({
  header,
  item_Height,
  categories,
  CategoryItemIcons,
  disabled,
  handleIconPress,
}) {
  const positions = useSharedValue(listToObject(categories));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const HEADER_HEIGHT = 100;

  useEffect(() => {
    positions.value = listToObject(categories);
  }, [categories]);

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, true)
  );

  function listToObject(list) {
    const values = Object.values(list);
    const object = {};

    for (let i = 0; i < values.length; i++) {
      object[values[i]._id] = i;
    }
    return object;
  }

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
          height: categories.length * item_Height + HEADER_HEIGHT,
        }}
      >
        {/* header is passed from prop, so that it can be in scrollView */}
        <Animated.View style={{ height: HEADER_HEIGHT }}>
          {header()}
        </Animated.View>
        <Animated.View>
          {categories.map((cat) => (
            <MoveableItem
              key={cat._id}
              id={cat._id}
              item={cat.category}
              positions={positions}
              scrollY={scrollY}
              itemCount={categories.length}
              item_Height={item_Height}
              header_Height={HEADER_HEIGHT}
              CategoryItemIcons={CategoryItemIcons}
              disabled={disabled}
              handleIconPress={handleIconPress}
            />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </>
  ));
  return <ExampleWithHoc />;
}
