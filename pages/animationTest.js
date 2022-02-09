import { useState } from "react";
import AnimationTestComp from "./AnimationTestComp";

const AnimationTest = () => {
  const [movingCude, setMovingCude] = useState();

  let count = [0, 1, 2, 3];
  return (
    <>
      {count.map((count) => (
        <AnimationTestComp
          key={count}
          movingCude={movingCude}
          setMovingCude={setMovingCude}
          count={count}
        />
      ))}
    </>
  );
};

export default AnimationTest;
