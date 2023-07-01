import { FunctionComponent, ReactNode } from "react";

interface DropItemProps {
  children: ReactNode;
  className?: string;
  dataName: string;
  dataValue: string;
}

const DropItem: FunctionComponent<DropItemProps> = ({
  children,
  className,
  dataName,
  dataValue,
}) => {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(dataName, dataValue);
  };
  return (
    <div draggable onDragStart={onDragStart} className={className}>
      {children}
    </div>
  );
};

export default DropItem;
