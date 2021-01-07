import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import ContactsFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Grid columns={2}>
      <Grid.Column>
        <ContactForm />
      </Grid.Column>
      <Grid.Column>
        <ContactsFilter />
        <Contacts />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
