const Notification = ({ message, isError }) => {
  if (!message) {
    return <></>
  }

  const successNoti = {
    color: "green",
    backGround: "white",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "green",
    padding: 10,
    marginBottom: 10,
  };

  const errorNoti = {
    ...successNoti,
    color: "red",
    backGround: "lightgrey",
    borderColor: "red",
  };

  return <div style={isError ? errorNoti : successNoti}>{message}</div>;
};

export default Notification;
