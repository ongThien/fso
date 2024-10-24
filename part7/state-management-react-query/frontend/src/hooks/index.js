import { useState, useContext } from "react";
import {
  NotificationContext,
  NotificationDispatchContext,
} from "../contexts/notificationContext";
import { UserContext, UserDispatchContext } from "../contexts/userContext";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    name,
    value,
    onChange,
    reset,
    "data-testid": name,
    autoComplete: type === "password" ? "current-password" : name,
  };
};

export const useNotification = () => useContext(NotificationContext);
export const useNotificationDispatch = () =>
  useContext(NotificationDispatchContext);

export const useUser = () => useContext(UserContext);
export const useUserDispatch = () => useContext(UserDispatchContext);

export const useNotify = () => {
  const dispatch = useNotificationDispatch();
  return (notificationObj) => {
    const timer = 5000;
    dispatch(notificationObj);
    setTimeout(() => dispatch({ type: "CLEAR" }), timer);
  };
};
