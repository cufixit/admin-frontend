import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSession = () => {
    setLoading(true);
    new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    })
      .then((session) => {
        setSession(session);
      })
      .catch(() => {
        setSession(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSession();
  }, []);

  const authenticate = (Username, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          getSession();
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const loginUser = async (username, password) => {
    await authenticate(username, password);
  };

  const logoutUser = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setSession(null);
      navigate("/login");
    }
  };

  const contextData = {
    login: loginUser,
    logout: logoutUser,
    session: session,
  };

  return loading ? (
    ""
  ) : (
    <AccountContext.Provider value={contextData}>
      {children}
    </AccountContext.Provider>
  );
};
