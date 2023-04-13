import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((session) => {
            setStatus(true);
        });
    }, []);
    return <div>{status ? <button onClick={logout}>Log out</button> : "Please log in"}</div>
};

export default Status;