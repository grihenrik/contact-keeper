import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const Logout = (props) => {
  const authContext = useContext(AuthContext);

  const { clearErrors, logout } = authContext;

  useEffect(() => {
    logout();
    props.history.push("/login");

    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, []);

  return <Redirect to="/login"></Redirect>;
};

export default Logout;
