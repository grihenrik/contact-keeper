import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Header, Icon } from "semantic-ui-react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert, removeAlert } = alertContext;
  const {
    clearErrors,
    error,
    isAuthenticated,
    loadUser,
    register,
  } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // if (localStorage.token) {
    //   loadUser();
    //   props.history.push("/");
    // }
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
    }
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const submitForm = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please fill out all fields", "danger");
    } else if (password.length < 8) {
      setAlert("Password should be 8 characters or more.");
    } else if (!email.match(new RegExp("^\\S{1,}@\\S{2,}\\.\\S{2,}$"))) {
      setAlert("Please enter a valid email address");
    } else {
      removeAlert();
      console.log(user);
      await register({
        name: name,
        email: email,
        password: password,
      });
      loadUser();
    }
  };
  return (
    <Container>
      <Header as="h1">
        <Container>
          <Icon name="user circle" />
          Register Account
        </Container>
      </Header>
      <Form>
        <Form.Input
          name="name"
          label="Name"
          value={name}
          required
          error={name === "" ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          type="email"
          label="Email"
          name="email"
          value={email}
          required
          error={email === "" ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          name="password"
          type="password"
          label="Password"
          value={password}
          required
          error={password.length < 8 ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          name="password2"
          type="password"
          label="Password again"
          value={password2}
          required
          error={password !== password2 ? true : false}
          onChange={handleChange}
        />
        <Form.Button fluid size="big" onClick={submitForm}>
          Register
        </Form.Button>
      </Form>
    </Container>
  );
};

export default Register;
