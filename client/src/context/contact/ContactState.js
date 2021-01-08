import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  TOGGLE_VISIBLE,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    visible: true,
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getUserContacts = async () => {
    state.loading = true;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/api/contacts", config);
      dispatch({ type: GET_CONTACTS, payload: res.data });
      state.loading = false;
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      state.loading = false;
    }
  };
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  //Add contact
  const addContact = async (contact) => {
    state.loading = true;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
      state.loading = false;
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
      state.loading = false;
    }
  };
  //Delete contact
  const deleteContact = async (id) => {
    state.loading = true;
    try {
      const res = await axios.delete("/api/contacts/" + id);
      dispatch({ type: DELETE_CONTACT, payload: res.data._id });
      state.loading = false;
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
      state.loading = false;
    }
  };
  //Update contact
  const updateContact = async (contact) => {
    state.loading = true;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        "/api/contacts/" + contact._id,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
      state.loading = false;
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
      state.loading = false;
    }
  };
  //Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const toggleVisible = (id) => {
    dispatch({ type: TOGGLE_VISIBLE, payload: id });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        visible: state.visible,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        getUserContacts,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        toggleVisible,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
