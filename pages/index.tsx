import { useNotification } from "@_providers/Notification/Notification";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { displayNotification } = useNotification();
  const handleClick = () => {
    displayNotification("Home Page Hello!", "error", 3000);
  };
  return <button onClick={handleClick}>Display Notif</button>;
};

export default Home;
