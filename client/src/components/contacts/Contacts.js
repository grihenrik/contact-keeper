import React, { Fragment, useContext, useEffect } from "react";
import { Transition } from "semantic-ui-react";
import ContactContext from "../../context/contact/contactContext";
import { Spinner } from "../layout/Spinner";
import { ContactItem } from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, loading } = contactContext;
  useEffect(() => {
    contactContext.getUserContacts();
    return () => {
      contactContext.clearContacts();
    };
    //eslint-disable-next-line
  }, []);
  if (loading) {
    return <Spinner />;
  }
  console.log(loading);
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
            <ContactItem key={contact._id + "-contact"} contact={contact} />
          ))}
        {filtered &&
          filtered.map((contact) => (
            <ContactItem key={contact._id + "-contact"} contact={contact} />
          ))}
      </Transition.Group>
    </>
  );
};

export default Contacts;
