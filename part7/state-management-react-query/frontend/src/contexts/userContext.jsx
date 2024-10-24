import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import storageService from "../services/storage";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

const UserContextProvider = ({ children }) => {
  const initialData = storageService.loadUser();
  const [user, dispatch] = useReducer(userReducer, initialData);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.element,
};

const userReducer = (user, action) => {
  switch (action.type) {
    case "LOGIN":
      storageService.saveUser(action.payload);
      return action.payload;
    case "LOGOUT":
      return storageService.removeUser();

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export default UserContextProvider;
