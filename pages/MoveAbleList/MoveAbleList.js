//  need to fix scrolling or get rid of it

import React, { useState, useEffect } from "react";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { GetCategory } from "../../dbRequests/Category";
import MoveableItem from "./MoveAbleItem";

const ITEM_HEIGHT = 75;

export default function MoveAbleList() {
  const [categories, setCategories] = useState([]);
  const positions = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();

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

  useEffect(() => {
    handleGetItems();
  }, []);

  const handleGetItems = async () => {
    data = await GetCategory();
    positions.value = listToObject(data);
    setCategories(data);
  };

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
          height: categories.length * ITEM_HEIGHT,
        }}
      >
        {categories.map((cat) => (
          <MoveableItem
            key={cat._id}
            id={cat._id}
            item={cat.category}
            positions={positions}
            scrollY={scrollY}
            itemCount={categories.length}
          />
        ))}
      </Animated.ScrollView>
    </>
  ));
  return <ExampleWithHoc />;
}
