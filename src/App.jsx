import "./App.css";
import { useState, useEffect } from "react";
import ListContacts from "./components/ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateContact from "./components/CreateContact";

const App = () => {

    let navigate = useNavigate();

    const createContact = (contact) => {
      const create = async () => {
        const res = await ContactsAPI.create(contact);
        setContacts(contacts.concat(res));
      };
      create();
      navigate("/");
    };

    const removeContact = (contact) => {
      ContactsAPI.remove(contact);
      setContacts (contacts.filter(c => c.id !== contact.id));
    }

    const [contacts, setContacts] = useState([]);

    useEffect(() =>{
      const getContacts = async () => {
        const res = await ContactsAPI.getAll();
        setContacts(res);
      };
      getContacts();
    }, []);
        

    return (
      <Routes>
        <Route exact path="/"
          element = {
            <ListContacts contacts = {contacts} onDeleteContact = {removeContact} />
          }
        />
        <Route exact path="/create"
          element = {
            <CreateContact onCreateContact = {createContact}/>
          }
        />
      </Routes>
    )
};

export default App;
