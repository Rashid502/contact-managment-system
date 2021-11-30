import React, {Fragment, useState, useContext, useEffect} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactContext from "../../context/contacts/contactContext";
import Spinner from "../layout/Spinner";
import ContactItem from "./ContactItem";
import ContactFilter from "./ContactFilter";

const favoriteStyle = {
  backgroundColor: 'white',
  color: 'black',
  border: '2px solid #dc3545',
}

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const {contacts, filtered, getContacts, loading} = contactContext;
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <button style={favoriteStyle}  onClick={(event => setFavorite(!favorite) )} > {favorite ? "Show All" : "Favorite"}</button>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered != null ? (
            filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          ) : contacts.length === 0 ? (
            <div className="text-primary">Pleas add Contact.</div>
          ) : (
            favorite ?
            contacts.map((contact) => (
              contact.favorite && <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            )) :
             contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
              )) 
          )}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
