import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
const Logout = (props) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { clearErrors, logout } = authContext;
  const { clearContacts } = contactContext;

  useEffect(() => {
    clearContacts();
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
