import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Grid, Header, Icon } from "semantic-ui-react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert, removeAlert } = alertContext;
  const { clearErrors, error, isAuthenticated, loadUser, login } = authContext;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(user);
    removeAlert();
    try {
      await login({ email: email, password: password });
      loadUser();
    } catch (error) {
      setAlert("Login failed");
    }
  };
  const innerHeight = window.innerHeight - 50;
  return (
    <div style={{ height: innerHeight + "px" }}>
      <Grid centered>
        <Grid.Column width={6}>
          <Header as="h1">
            <Container textAlign="center">
              <Icon name="user circle" />
              Login
            </Container>
          </Header>
          <Form>
            <Form.Input
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Form.Input
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={handleChange}
            />

            <Form.Button fluid size="big" primary onClick={submitForm}>
              Login
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
