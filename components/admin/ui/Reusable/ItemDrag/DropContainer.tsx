import { FunctionComponent, ReactNode } from "react";

interface DropContainerProps {
  dropHandler: (dataValue: string) => void;
  children: ReactNode;
  className?: string;
  dataName: string;
}

const DropContainer: FunctionComponent<DropContainerProps> = ({
  dropHandler,
  children,
  className,
  dataName,
}) => {
  const onDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData(dataName);
    dropHandler(data);
  };

  return (
    <div
      className={className}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
};

export default DropContainer;
