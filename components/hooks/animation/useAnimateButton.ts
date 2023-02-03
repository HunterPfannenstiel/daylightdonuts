import { useEffect, useState } from "react";

const useAnimateButton = (animationTime: number) => {
  const [clicked, setClicked] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clicked) {
      setPlayAnimation(true);
      timer = setTimeout(() => {
        setPlayAnimation(false);
        setClicked(false);
      }, animationTime);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [clicked]);

  const buttonClick = () => {
    setClicked(true);
  };
  return {
    buttonClick,
    playAnimation,
  };
};

export default useAnimateButton;
