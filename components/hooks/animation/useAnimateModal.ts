import { useEffect, useState } from "react";

const useAnimateModal = (
  animationDuration: number,
  onAnimationEnd?: () => {}
) => {
  const [showModal, setShowModal] = useState(false);
  const [handle, setHandle] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleModal = () => {
    setHandle(true);
  };

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (playAnimation) {
  //     timer = setTimeout(() => {
  //       setShowModal(false);
  //       setPlayAnimation(false);
  //     }, animationDuration);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [playAnimation]);
  // console.log("ShowModal", showModal);
  // console.log("PlayAnim", playAnimation);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (handle) {
      if (!showModal) {
        setShowModal(true);
        setPlayAnimation(false);
      } else if (playAnimation) {
        setPlayAnimation(false);
        setShowModal(true);
      } else {
        setPlayAnimation(true);
        timer = setTimeout(() => {
          setShowModal(false);
          setPlayAnimation(false);
          if (onAnimationEnd) {
            onAnimationEnd();
          }
        }, animationDuration);
      }
      setHandle(false);
    }

    return () => {
      if (playAnimation) {
        clearTimeout(timer);
      }
    };
  }, [handle]);

  return {
    showModal,
    playAnimation,
    handleModal,
  };
};

export type ModalProps = {
  handleModal: () => void;
  playAnimation: boolean;
  showModal: boolean;
};

export default useAnimateModal;
