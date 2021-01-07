import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";
import { Container, Form, Header } from "semantic-ui-react";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const [text, setText] = useState("");
  const onChange = (e, { value }) => {
    if (value !== "") {
      setText(value);
      contactContext.filterContacts(text);
    } else {
      setText("");
      contactContext.clearFilter();
    }
  };

  return (
    <Container>
      <Form.Group>
        <Form.Input
          value={text}
          onChange={onChange}
          name="search"
          fluid
          placeholder="Search..."
        ></Form.Input>
      </Form.Group>
    </Container>
  );
};

export default ContactFilter;
