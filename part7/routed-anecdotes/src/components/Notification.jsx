import { useNotification } from "../context/notificationsContext";

const Notification = () => {
  const notification = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
