import { useState } from "react";

export const useInputField = (type, name, required = false) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => setValue(target.value);
  const reset = () => setValue("");
  const label = name.replace(name.charAt(0), name.charAt(0).toUpperCase());

  return { label, type, name, value, onChange, reset, required };
};
