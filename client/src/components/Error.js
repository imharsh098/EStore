import React from "react";

function Error(message) {
  return (
    <div
      style={{
        border: "2px solid red",
        borderRadius: "7px",
        textAlign: "center",
        padding: "2px",
      }}
    >
      <h2 style={{ color: "red" }}>{message}</h2>
    </div>
  );
}

export default Error;
