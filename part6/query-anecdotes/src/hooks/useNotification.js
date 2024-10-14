import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export const useNotificationValue = () => {
  const notiAndDispatch = useContext(NotificationContext);
  return notiAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notiAndDispatch = useContext(NotificationContext);
  return notiAndDispatch[1];
};