import { FunctionComponent, useState } from "react";
import classes from "./Test.module.css";
import ImageComponent from "@_admin-reuse/ModifyMenuItem/ImageComponent";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const [images, setImages] = useState([
    "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400003/item_images/tjah32egdkq8idarjgkd.png",
    "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1673400201/item_images/l7gfyvo8tps7zwdin4wn.png",
  ]);
  const handleOnDrag = (e: React.DragEvent, index: string) => {
    e.dataTransfer.setData("index", index);
  };

  const handleOnDrop = (e: React.DragEvent, currIndex: string) => {
    const index = e.dataTransfer.getData("index");
    setImages((prevState) => {
      const copyState = [...prevState];
      const temp = copyState[+currIndex];
      copyState[+currIndex] = copyState[+index];
      copyState[+index] = temp;
      return copyState;
    });
  };
  return (
    <>
      {images.map((image, i) => {
        return (
          <>
            <ImageComponent
              key={image}
              index={i}
              imageUrl={image}
              onImageDragged={handleOnDrag}
              onImageDropped={handleOnDrop}
            />
            <p>{`Display Order: ${i + 1}`}</p>
          </>
        );
      })}
    </>
  );
};

export default Test;
