import React, { useContext } from "react";
import { AccountContext } from "./AccountContext";

const Status = () => {
  const { session, logout } = useContext(AccountContext);

  console.log(session);

  return <div>{session ? <button onClick={logout}>Log out</button> : ""}</div>;
};

export default Status;
