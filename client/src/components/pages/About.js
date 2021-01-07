import React from "react";
import { Card } from "semantic-ui-react";

const About = () => {
  return (
    <>
      <Card fluid>
        <div className="content">
          <Card.Header as="h2">About this app</Card.Header>
          <Card.Meta as="p">{Date().toString()}</Card.Meta>
          <Card.Description as="h4">
            This is a full stack React app for keeping contacts
          </Card.Description>
          <Card.Content extra>Version: 1.0.0</Card.Content>
        </div>
      </Card>
    </>
  );
};

export default About;
