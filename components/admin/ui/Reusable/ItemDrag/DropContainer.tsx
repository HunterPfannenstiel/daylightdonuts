import { FunctionComponent, ReactNode } from "react";

interface DropContainerProps {
  dropHandler: (e: React.DragEvent) => void;
  children: ReactNode;
  className?: string;
}

const DropContainer: FunctionComponent<DropContainerProps> = ({
  dropHandler,
  children,
  className,
}) => {
  return (
    <div
      className={className}
      onDrop={dropHandler}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
};

export default DropContainer;
