import { useReducer, createContext } from "react";

export const NotificationsContext = createContext(null);
export const NotificationsDispatchContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationsReducer, "");

  return (
    <NotificationsContext.Provider value={notification}>
      <NotificationsDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationsDispatchContext.Provider>
    </NotificationsContext.Provider>
  )
}

const notificationsReducer = (notification, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE_CREATED":
      return `a new anecdote ${action.payload} created`;
    case "CLEAR":
      return "";
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};