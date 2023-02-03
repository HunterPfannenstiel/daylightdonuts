import {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import classes from "./Notification.module.css";

interface NotificationProps {
  text: ReactNode;
  color: string;
  render: boolean;
}

const animationTime = 350;

const Notification: FunctionComponent<NotificationProps> = ({
  text,
  color,
  render,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!render) {
      if (showNotification) {
        timer = setTimeout(() => {
          setShowNotification(false);
        }, animationTime);
      }
    } else {
      setShowNotification(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [render]);
  if (showNotification) {
    return (
      <div
        className={`${classes.notification} ${
          !render ? classes.animate_out : ""
        }`}
        style={
          {
            backgroundColor: color,
            "--animation-time": animationTime + "ms",
          } as CSSProperties
        }
      >
        <p>{text}</p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Notification;
