import React, { useState } from "react";
import { Header, Menu, Segment } from "semantic-ui-react";
import { string } from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  const [isActive, setActive] = useState("home");

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
            to="/"
            name="home"
            active={isActive === "home"}
            onClick={handleClick}
          ></Menu.Item>
          <Menu.Item
            as={Link}
            to="/about"
            name="about"
            active={isActive === "about"}
            onClick={handleClick}
          ></Menu.Item>
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={isActive === "login"}
            onClick={handleClick}
          ></Menu.Item>
          <Menu.Item
            as={Link}
            to="/register"
            name="register"
            active={isActive === "register"}
            onClick={handleClick}
          ></Menu.Item>
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
