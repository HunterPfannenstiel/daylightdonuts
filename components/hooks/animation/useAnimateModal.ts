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

  const getModalProps = ({ ...otherProps } = {}): ModalProps => {
    return {
      showModal,
      playAnimation,
      animationTime: animationDuration,
      handleModal,
      ...otherProps,
    };
  };

  return {
    showModal,
    playAnimation,
    handleModal,
    getModalProps,
  };
};

export type ModalProps = {
  showModal: boolean;
  playAnimation: boolean;
  animationTime: number;
  handleModal: () => void;
};

export default useAnimateModal;
