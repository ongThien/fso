/* eslint-disable react/prop-types */
import { useReducer, createContext } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATE":
        return `anecdote ${action.payload} created`;
      case "VOTE":
        return `anecdote ${action.payload} voted`;
      case "ERROR":
        return `too short anecdote, must have length 5 or more`;
      case "CLEAR":
        return "";
      default:
        return state;
    }
  };

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
