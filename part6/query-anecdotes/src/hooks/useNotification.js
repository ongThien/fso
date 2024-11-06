import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export const useNotificationValue = () => {
  const notiAndDispatch = useContext(NotificationContext);
  return notiAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const [_, dispatch] = useContext(NotificationContext);
  return (notiObject) => {
    dispatch(notiObject);
    const timer = 5000;
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, timer);
  };
};