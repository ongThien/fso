import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const NotificationContext = createContext();
export const NotificationDispatchContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={notification}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.element,
};

const notificationReducer = (notification, action) => {
  const generateNotification = (message, type = "success") => {
    return { message, type };
  };

  switch (action.type) {
    case "USER_LOGIN":
      return generateNotification(`Welcome back, ${action.payload.name}`);
    case "USER_LOGOUT":
      return generateNotification(`Bye, ${action.payload.name}`);
    case "NEW_BLOG":
      return generateNotification(
        `Blog created: ${action.payload.title}, ${action.payload.author}`
      );
    case "UPVOTE_BLOG":
      return generateNotification(
        `You liked ${action.payload.title}, by ${action.payload.author}`
      );
    case "REMOVE_BLOG":
      return generateNotification(
        `Blog ${action.payload.title}, by ${action.payload.author} removed`
      );
    case "USER_LOGIN_ERROR":
      return generateNotification("Wrong credentials", "error");
    case "NEW_COMMENT":
      return generateNotification(`You added a new comment`);
      case "ERROR":
      return generateNotification("Something went wrong", "error");
    case "CLEAR":
      return null;

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export default NotificationContextProvider;
