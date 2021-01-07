import React, { Fragment, useContext } from "react";
import { Transition, List } from "semantic-ui-react";
import ContactContext from "../../context/contact/contactContext";
import { ContactItem } from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;
  return (
    <>
      <Transition.Group>
        {contacts.length === 0 && (
          <div className="ui header">
            <h3 className="header">No contacts</h3>
          </div>
        )}

        {!filtered &&
          contacts.map((contact) => (
            <ContactItem key={contact.id + "-contact"} contact={contact} />
          ))}
        {filtered &&
          filtered.map((contact) => (
            <ContactItem key={contact.id + "-contact"} contact={contact} />
          ))}
      </Transition.Group>
    </>
  );
};

export default Contacts;
