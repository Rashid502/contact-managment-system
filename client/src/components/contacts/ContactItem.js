import React, {useContext} from "react";
import ContactContext from "../../context/contacts/contactContext";
import ContactForm from "./ContactForm";
import star1 from '../../img/star1.svg'
import fstar from '../../img/fstar.svg'

const ContactItem = ({contact}) => {
  const contactContext = useContext(ContactContext);

  const {deleteContact, editContact, setCurrent, clearCurrent, editFavorite} = contactContext;

  const {_id, name, email, phone, type} = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const favoriteClick = (e, favorite) => {
    e.preventDefault();
    console.log("Favorite clicked..." + favorite)
    let newContact = {
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      type: contact.type,
      type: contact.type,
      favorite: !contact.favorite,
    }
    console.log(newContact)
    editFavorite(newContact);
  }

  return (
    <div className="card bg-light">
      
      <h3 className="text-primary text-left">
        {name}{" "}
        <div style={{float: "right"}}>
        {contact.favorite ?
        <button style={{border: "none", backgroundColor:"transparent"}} value="false" onClick={(event) => favoriteClick(event, true)}><img src={fstar} height={16} width={16} style={{width: "16px"}}/></button> 
         :
         <button style={{border: "none", backgroundColor:"transparent"}} value="true" onClick={(event) => favoriteClick(event, true)}><img src={star1} height={16} width={16} style={{width: "16px"}}/></button>
          }
        
        <span
          style={{float: "right"}}
          className={
            "badge  " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        </div>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
