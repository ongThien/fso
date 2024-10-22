import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleNoti } from "../slides/notificationSlide";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => setValue(target.value);

  const reset = () => setValue("");

  return { type, name, value, onChange, reset, "data-testid": name };
};

export const useNotify = () => {
  const dispatch = useDispatch();

  return (message, type = "success") => dispatch(handleNoti({ message, type }));
};
