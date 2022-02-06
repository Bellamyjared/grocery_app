import AnimationTestComp from "./animationTestComp";

const animationTest = () => {
  let count = ["1", "2", "3"];
  return (
    <>
      {count.map(() => (
        <AnimationTestComp />
      ))}
    </>
  );
};

export default animationTest;
