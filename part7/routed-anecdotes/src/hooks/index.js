import { useState, useContext } from "react";
import { AnecdotesContext, AnecdotesDispatchContext } from "../context/anecdotesContext";
import { NotificationsContext, NotificationsDispatchContext } from "../context/notificationsContext";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  }

  return { type, name, value, onChange, reset };
};

export const useAnecdotes = () => useContext(AnecdotesContext);
export const useAnecdotesDispatch = () => useContext(AnecdotesDispatchContext);

export const useNotification = () => useContext(NotificationsContext);
export const useNotificationDispatch = () =>
  useContext(NotificationsDispatchContext);