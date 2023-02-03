import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  selector: string;
}

const Modal = ({ children, selector }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);
  return mounted
    ? createPortal(children, document.querySelector(selector) as HTMLDivElement)
    : null;
};

export default Modal;
