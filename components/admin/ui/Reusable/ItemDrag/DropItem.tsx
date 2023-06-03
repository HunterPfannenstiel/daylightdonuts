import { FunctionComponent, ReactNode } from "react";

interface DropItemProps {
  handleDragStart: (e: React.DragEvent) => void;
  children: ReactNode;
  className?: string;
}

const DropItem: FunctionComponent<DropItemProps> = ({
  handleDragStart,
  children,
  className,
}) => {
  return (
    <div draggable onDragStart={handleDragStart} className={className}>
      {children}
    </div>
  );
};

export default DropItem;
