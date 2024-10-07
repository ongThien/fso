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
      className={detail ? "hideBtn" : "viewBtn"}
    >
      {detail ? "hide" : "view"}
    </button>
  );
};

const LikeBtn = ({ handleOnClick }) => {
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
      onClick={handleOnClick}
      className="likeBtn"
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
      className="removeBtn"
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
