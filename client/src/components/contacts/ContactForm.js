import React, {useState, useContext, useEffect} from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {addContact, updateContact, current, clearCurrent} = contactContext;

  useEffect(() => {
    if (current === null) {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    } else {
      setContact(current);
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const {name, email, phone, type} = contact;

  const onChange = (e) =>
    setContact({...contact, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearCurrent();
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {" "}
        {current ? "Update Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="Phone"
        onChange={onChange}
      />
      <div>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />{" "}
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />
        Professional
      </div>
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          class="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
