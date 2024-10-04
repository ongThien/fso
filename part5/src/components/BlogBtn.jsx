import { useState } from "react";

const btnStyle = {
  padding: 8,
  border: "none",
  borderRadius: 4,
};

const ViewBtn = ({ detail, handleOnClick }) => {
  const [hover, setHover] = useState(false);

  const viewBtnStyle = {
    ...btnStyle,
    backgroundColor: hover ? "green" : "lightgreen",
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClick}
      style={viewBtnStyle}
    >
      {detail ? "hide" : "view"}
    </button>
  );
};

const LikeBtn = () => {
  const [hover, setHover] = useState(false);

  const likeBtnStyle = {
    ...btnStyle,
    backgroundColor: hover ? "blue" : "lightblue",
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={likeBtnStyle}
    >
      like
    </button>
  );
};

const RemoveBtn = ({ handleOnClick }) => {
  const [hover, setHover] = useState(false);

  const removeBtnStyle = {
    ...btnStyle,
    backgroundColor: hover ? "red" : "pink",
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClick}
      style={removeBtnStyle}
    >
      remove
    </button>
  );
};

export {
  ViewBtn,
  LikeBtn,
  RemoveBtn,
};
