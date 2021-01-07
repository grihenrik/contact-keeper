import React, { useState } from "react";
import { Form, Input, Segment } from "semantic-ui-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.password);
    setUsername(e.target.username);
  };
  const submitLogin = (e) => {
    console.log(username, password);
  };
  return (
    <>
      <Form size="large" onSubmit={submitLogin}>
        <Segment>
          <Form.Group>
            <Form.Field
              id="form-username"
              value={username}
              control={Input}
              label="Username"
              name="username"
              required
              placeholder="Input your username"
              width={8}
              onChange={handleChange}
            />
            <Form.Field
              id="form-password"
              control={Input}
              label="Password"
              value={password}
              name="password"
              required
              placeholder="Password"
              type="password"
              width={8}
              onChange={handleChange}
            />
            <Form.Button fluid width={8} type="submit">
              Login
            </Form.Button>
          </Form.Group>
        </Segment>
      </Form>
    </>
  );
};

export default Login;
