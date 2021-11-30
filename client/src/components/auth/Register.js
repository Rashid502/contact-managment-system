import React, {useState, useContext, useEffect} from "react";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

function Register(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const {
    register,
    loadUser,
    clearErrors,
    token,
    isAuthenticated,
    error,
  } = authContext;

  const {setAlert} = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    //User with this email already exist.
    if (error === "User with this email already exist.") {
      setAlert("User with this email already exist.", "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields.", "danger");
    } else if (password !== password2) {
      setAlert("Password does not match.", "danger");
    } else {
      register({name, email, password});
      console.log("token: " + token);
    }
  };

  return (
    <div>
      <h1>
        Account <span class="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label htmlFor="name" name="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div class="form-group">
          <label htmlFor="email" name="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
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
            required
          />
        </div>
        <div class="form-group">
          <label htmlFor="password2" name="password2">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Register"
            class="btn btn-primary btn-block"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Register;
