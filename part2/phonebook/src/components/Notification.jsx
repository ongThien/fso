const Notification = ({ message }) => {

  if (!message.content) {
    return <></>;
  }

  const errorNoti = {
    color: "red",
    backGround: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const succNoti = {
    ...errorNoti,
    color: "green",
    backGround: "white",
  };

  return (
    <div style={message.isErr ? errorNoti : succNoti}>{message.content}</div>
  );
};

export default Notification;
