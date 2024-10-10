import { useSelector } from "react-redux";

const Notification = () => {
  const notificationSelector = ({ notification }) => notification;
  const notification = useSelector(notificationSelector);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const hideStyle = {
    ...style,
    display: "none",
  };

  return (
    <div style={notification ? style : hideStyle}>
      {notification ? notification : ""}
    </div>
  );
};

export default Notification;
