import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import classes from "./Image.module.css";

interface ImageProps {}

const Image: FunctionComponent<ImageProps> = () => {
  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer>();
  const [cloudinaryURL, setCloudinaryURL] = useState();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //Once the reader has read in the file, this will trigger
        if (reader.result) {
          setImageURL(reader.result);
        }
      };
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: JSON.stringify({ data: imageURL }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.url) {
        setCloudinaryURL(data.url);
      }
      console.log(data);
    }
  };

  console.log(image);
  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleInputChange} />
      {/* {image && <img src={imageURL} />} */}
      {cloudinaryURL && <img src={cloudinaryURL} />}
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default Image;
