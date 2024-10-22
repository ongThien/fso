import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storageService from "../services/storage";

const userSlide = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    get: (state) => state,
    set: (state, action) => action.payload,
    remove: () => null,
  },
});

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials);
  dispatch(set(user));
  storageService.saveUser(user);
};

export const logout = () => async dispatch => {
  dispatch(remove());
  storageService.removeUser();
}

export const initializeUser = () => (dispatch) => {
  const user = storageService.loadUser();
  if (user) {
    dispatch(set(user));
  }
};

export const { get, set, remove } = userSlide.actions;
export default userSlide.reducer;
