import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Item, Header, Radio } from "semantic-ui-react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    }
  }, [contactContext]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  //const { name, email, phone, type } = contact;
  const handleChange = (e) => {
    const selector = e.target.name;
    // console.log([selector], e.target.value);
    setContact({ ...contact, [selector]: e.target.value });
  };
  const handleChangeRadio = (e, { value }) => {
    // console.log(value);
    setContact({ ...contact, type: value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    // console.log(contact);
    contactContext.addContact(contact);
    contactContext.toggleVisible(contact.id);
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };
  const submitFormChange = (e) => {
    e.preventDefault();
    // console.log(contact);
    contactContext.updateContact(contact);
    contactContext.toggleVisible(contact.id);
    contactContext.clearCurrent();
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };
  return (
    <Item>
      <Form>
        {!contactContext.current && (
          <Header as="h3" textAlign="left">
            Add Contact
          </Header>
        )}
        {contactContext.current && (
          <Header as="h3" textAlign="left">
            Edit Contact
          </Header>
        )}
        <Form.Input
          fluid
          name="name"
          label="Name"
          value={contact.name}
          onChange={handleChange}
        ></Form.Input>

        <Form.Input
          fluid
          type="email"
          name="email"
          label="Email"
          value={contact.email}
          onChange={handleChange}
        ></Form.Input>

        <Form.Input
          fluid
          type="phone"
          name="phone"
          label="Phone"
          value={contact.phone}
          onChange={handleChange}
        ></Form.Input>
        <Container as="h5" textAlign="left">
          Contact Type
        </Container>
        <Form.Group widths="equal">
          <Form.Field
            control={Radio}
            label="Professional"
            value={"professional"}
            checked={contact.type === "professional"}
            onChange={handleChangeRadio}
          />
          <Form.Field
            control={Radio}
            label="Personal"
            value={"personal"}
            checked={contact.type === "personal"}
            onChange={handleChangeRadio}
          />
        </Form.Group>
        {!contactContext.current && (
          <Form.Button fluid primary onClick={submitForm}>
            Add Contact
          </Form.Button>
        )}
        {contactContext.current && (
          <Form.Button fluid color="green" onClick={submitFormChange}>
            Change Contact
          </Form.Button>
        )}
        <Form.Button
          fluid
          onClick={() => {
            contactContext.clearCurrent();
            setContact({
              name: "",
              email: "",
              phone: "",
              type: "personal",
            });
          }}
        >
          Clear
        </Form.Button>
      </Form>
    </Item>
  );
};

export default ContactForm;
