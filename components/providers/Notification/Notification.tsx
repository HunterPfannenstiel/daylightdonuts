import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Noti from "components/ui/Notification/Notification";

const colors = {
  success: "var(--success)",
  pending: "var(--pending)",
  error: "var(--error)",
};

type Status = "success" | "pending" | "error";

type Notification = { text: string; status: Status; delay: number };

const Notification = createContext({
  displayNotification: (
    text: string,
    status: Status,
    displayTime: number
  ) => {},
});

export const NotificationProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    text: "",
    status: "pending",
    delay: 0,
  });
  const displayNotification = (
    text: string,
    status: Status,
    displayTime: number
  ) => {
    setNotification(() => {
      return { text, status, delay: displayTime };
    });
    setShowNotification(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, notification.delay);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);
  return (
    <Notification.Provider value={{ displayNotification }}>
      <Noti
        text={notification.text}
        color={colors[notification.status]}
        render={showNotification}
      />
      {children}
    </Notification.Provider>
  );
};

export const useNotification = () => {
  return useContext(Notification);
};
