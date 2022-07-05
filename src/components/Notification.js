const Notification = ({ successMessage, errorMessage }) => {
  return (
    <div>
      {successMessage && (
        <div
          style={{
            color: "green",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        >
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div
          style={{
            color: "red",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Notification;
