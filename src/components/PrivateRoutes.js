import React, {useContext, useState, useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { AccountContext } from "./Account";

const PrivateRoutes = () => {
    const location = useLocation();
    const {getSession} = useContext(AccountContext);
    const [status, setStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSession().then(() => {
            setStatus(true);
            setLoading(false);
        }, function(error) {
            setStatus(false);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return
    }
    return status ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace state={{from: location}}/>
    );
};

export default PrivateRoutes;