import React, {useState, useContext, useEffect} from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alerts/alertContext";
import ContactContext from "../../context/contacts/contactContext";

function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const contactContext = useContext(ContactContext);

  const {login, clearErrors, isAuthenticated, error} = authContext;
  const {getContacts} = contactContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials.") {
      alertContext.setAlert(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {email, password} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alertContext.setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  const divStyle = {
    width: '500px'
  };

  return (
    <div style={divStyle}>
      <h1>
        Account <span class="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label htmlFor="email" name="email">
            Email
          </label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div class="form-group">
          <label htmlFor="password" name="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <div>
          <input
            type="submit"
            value="Login"
            class="btn btn-primary btn-block"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Login;
