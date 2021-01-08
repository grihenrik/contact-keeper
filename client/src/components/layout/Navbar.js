import React, { useState, useContext } from "react";
import { Icon, Header, Menu, Segment } from "semantic-ui-react";
import { string } from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const Navbar = ({ title, icon }) => {
  const [isActive, setActive] = useState("home");
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;
  const handleClick = (e, { name }) => {
    setActive(name);
  };

  return (
    <Segment clearing className="blue inverted">
      <Header
        as="h1"
        inverted
        floated="left"
        icon={icon}
        content={title}
      ></Header>
      <Header as="h3" floated="right">
        <Menu secondary inverted>
          <Menu.Item
            as={Link}
            to="/about"
            name="about"
            active={isActive === "about"}
            onClick={handleClick}
          >
            <Icon name="info" />
            <span className="hide-sm">About</span>
          </Menu.Item>
          {isAuthenticated && (
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/"
                name="home"
                active={isActive === "home"}
                onClick={handleClick}
              >
                <Icon name="user outline" />
                <span className="hide-sm">{user && user.name}</span>
              </Menu.Item>
              <Menu.Item as={Link} to="/logout">
                <Icon name="sign out alternate" />
                <span className="hide-sm">Logout</span>
              </Menu.Item>
            </Menu.Menu>
          )}
          {!isAuthenticated && (
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={isActive === "login"}
              onClick={handleClick}
            >
              <Icon name="sign in" />
              <span className="hide-sm">Login</span>
            </Menu.Item>
          )}
          {!isAuthenticated && (
            <Menu.Item
              as={Link}
              to="/register"
              name="register"
              active={isActive === "register"}
              onClick={handleClick}
            >
              <Icon name="signup" />
              <span className="hide-sm">Register</span>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </Segment>
  );
};

Navbar.propTypes = {
  title: string.isRequired,
  icon: string.isRequired,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "id card",
};

export default Navbar;
