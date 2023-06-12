import { FunctionComponent } from "react";
import classes from "./TextArea.module.css";

interface TextAreaProps extends HTMLTextAreaElement {}

const TextArea: FunctionComponent<TextAreaProps> = (...props) => {
  return <textarea></textarea>;
};

export default TextArea;
