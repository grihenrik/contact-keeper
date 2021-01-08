import { object } from "prop-types";
import React, { useContext } from "react";
import { Button, Card, Container, Icon } from "semantic-ui-react";
import ContactContext from "../../context/contact/contactContext";

export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const id = _id;
  const { toggleVisible } = contactContext;
  const onDelete = () => {
    toggleVisible(id);
    setTimeout(() => {
      contactContext.deleteContact(id);
      contactContext.clearCurrent();
    }, 1);
  };
  const onEdit = () => {
    toggleVisible(contact.id);
    contactContext.setCurrent(contact);
  };
  return (
    <Card fluid key={id + "-card"}>
      <Card.Content>
        <Card.Header as="h4">
          {name}{" "}
          <span style={{ textTransform: "capitalize", float: "right" }}>
            <Icon
              name="certificate"
              className={type === "professional" ? "blue" : "green"}
            />
            <Button
              size="mini"
              color={type === "professional" ? "blue" : "green"}
              style={{ textTransform: "capitalize" }}
            >
              {type}
            </Button>
          </span>
        </Card.Header>
        <Card.Content>
          {email && (
            <Container>
              <Icon name="mail" />
              {email}
            </Container>
          )}
          {phone && (
            <Container>
              <Icon name="phone" />
              {phone}
            </Container>
          )}
        </Card.Content>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={onEdit}>
            <Icon name="pencil" />
            Edit
          </Button>
          <Button basic color="red" onClick={onDelete}>
            <Icon name="trash" />
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

ContactItem.propTypes = {
  contact: object.isRequired,
};
