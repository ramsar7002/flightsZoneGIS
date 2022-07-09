import React, { useState } from "react";
import axios from "axios";
// import SignIn from "./SignIn";
import App from "./App";
// import { Link } from "react-router-dom";

function UserSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const [addUser, setAddUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [signUpErr, setSignUpErr] = useState("");

  const addNewUserBtnClicked = async (e) => {
    // setAddUser(true);
    setUserCreated(false);
    const url = "https://localhost:9000/register";

    const res = await axios
      .post(url, {
        lastName: lastName,
        firstName: firstName,
        emailAddress: mail,
        username: userName,
        password: password,
      })
      .catch((err) => {
        console.log(lastName, firstName, mail, userName, password);
        if (err?.response?.status !== 200) {
          setUserCreated(false);
          setSignUpErr(err?.response?.data);
          return (
            <div
              className="ui error message"
              dangerouslySetInnerHTML={{ __html: signUpErr }}
            ></div>
          );
        }
      });

    if (res && res.status === 200) {
      // setAddUser(false);
      setUserCreated(true);
      // setFirstName("");
      // setLastName("");
      // setMail("");
      // setPhone("");
      // setPassword("");
      // setUserName("");
      setSignUpErr(`Success!
        <a className="active item" href="/">
          Home
        </a>
        `);
    }
  };

  const showErr = () => {
    return (
      <div
        className="ui error message"
        dangerouslySetInnerHTML={{ __html: signUpErr }}
      ></div>
    );
  };
  if (!userCreated) {
    return (
      <div className="ui container segment">
        <form className="ui form">
          <h4 className="ui dividing header">הרשמת משתמש</h4>

          <div className="field">
            <label>שם</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="שם פרטי"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="שם משפחה"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label>פרטי יצירת קשר</label>
            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="אימייל"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>פרטי התחברות</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="userName"
                  placeholder="שם משתמש"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  placeholder="סיסמא"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            className="ui button"
            tabIndex="0"
            onClick={(e) => addNewUserBtnClicked(e)}
          >
            הרשמה
          </div>
        </form>
        {signUpErr ? showErr() : ""}
      </div>
    );
  } else {
    setUserCreated(false);
    return (
      <div className="ui">
        <App />
      </div>
    );
  }
}

export default UserSignUp;
