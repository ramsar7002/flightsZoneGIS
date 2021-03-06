import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import App from "./App";
import Main from "./Main";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPaswword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLogIn, setisLogIn] = useState(false);
  const [loginTry, setLoginTry] = useState(false);
  const [pinCode, setPinCode] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [changePassErr, setChangePassErr] = useState("");

  const loginMessagge = (errMessage) => {
    // return setTimeout(() => {
    //   <div className="ui error message">bla bla bla</div>;
    // }, 3000);
    return (
      <div
        className="ui error message"
        dangerouslySetInnerHTML={{ __html: errMessage }}
      ></div>
    );
  };

  useEffect(() => {
    let url = "https://localhost:9000/login";

    axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.loggedIn === true) {
          console.log(response.data.username);
          setUserName(response.data.username);
          setisLogIn(true);
        }
      });
  }, []);

  const findUserName = async () => {
    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {});
    if (!res) return false;

    const found = res?.data.find((element) => element.username === username);
    if (!found) {
      setChangePassErr(`${username} not found`);
      return false;
    } else return true;
  };

  const pinCodeInput = () => {
    return (
      <form className="ui fluid form">
        <br />
        <br />
        <div className="field" placeholder="Last Name">
          <div className="ui pointing below label">
            אם שם המשתמש קיים במערכת, נשלח מייל עם קוד אל המייל המקושר אל
            החשבון.
          </div>
          <div
            className="ui input focus"
            onChange={(e) => setPinCode(e.target.value)}
            value={pinCode}
          >
            <input type="text" placeholder="קוד" />
          </div>
          <br />
          <br />
          <div
            className="ui input focus"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          >
            <input type="password" placeholder="סיסמא חדשה" />
          </div>
          <div>
            <br />
          </div>

          <button className="ui icon button" onClick={(e) => PinCodeSendBTN(e)}>
            Send
          </button>
        </div>
      </form>
    );
  };

  const PinCodeSendBTN = async (e) => {
    e.preventDefault();
    const url = `https://localhost:9000/users/${userID}/changeForgottenPassword`;

    await axios
      .post(url, {
        pincode: pinCode,
        password: newPassword,
      })
      .then(() => {
        setPinCode("");
        setChangePassErr(`הסיסמא השתנתה בהצלחה!`);
        setNewPassword("");
        setTimeout(() => {
          setForgotPasswordClicked(false);
          setChangePassErr(``);
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response?.status);
        if (err.response?.status === 404) {
          setChangePassErr(`${username} לא קיים במערכת`);
        } else setChangePassErr(err.response.data);
        return;
      });
  };

  const loginPage = () => {
    // const isLoggedIn = localStorage.getItem("isLoggedin");
    // if (isLoggedIn) {
    //   return <App Component={<Customers />} />;
    // } else
    return (
      <div className="ui middle aligned center aligned grid stacked segment container">
        <div className="column">
          <h2 className="ui black image header">
            <i className="sync alternate icon"></i>

            <div className="content">התחברות למשתמש קיים</div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui icon input">
                  <i className="user icon"></i>
                  <input
                    dir="rtl"
                    type="text"
                    name="username"
                    value={username}
                    onChange={onUserNameChange}
                    placeholder="שם משתמש"
                  />
                </div>
              </div>
              <div className="field ">
                <div className="ui  icon input">
                  <i className="lock icon"></i>
                  <input
                    dir="rtl"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="סיסמא"
                  />
                </div>
              </div>
              <button
                disabled={username && password ? false : true}
                className="ui fluid large black submit button forgot"
                onClick={userLogin}
              >
                התחברות
              </button>
            </div>
          </form>

          {/* <div class="ui message">
          New to us? <Link to="/signup">Sign Up</Link>
        </div> */}

          {loginTry && !isLogIn
            ? loginMessagge(`${username} לא מזוהה במערכת`)
            : ""}
          <br />

          <button
            type="button"
            title="click here"
            disabled={username ? false : true}
            className="ui small button "
            onClick={(e) => forgotPasswordClick(e)}
          >
            <i className="icon user"></i>- שכח סיסמא
          </button>

          <Link className="ui small button" to="/usersignup">
            <i className="user plus icon"></i>- רישום משתמש חדש
          </Link>
          {forgotPasswordClicked && findUserName().then((t) => t)
            ? pinCodeInput()
            : ""}

          {username && forgotPasswordClicked && changePassErr
            ? loginMessagge(changePassErr)
            : ""}
        </div>
      </div>
    );
  };

  const CustomersPage = () => {
    return (
      <div className="ui">
        <Main userName={username} />
      </div>
    );
  };

  const onUserNameChange = (e) => {
    setLoginTry(false);
    setUserName(e.target.value);
    setForgotPasswordClicked(false);
  };

  const onPasswordChange = (e) => {
    setLoginTry(false);
    setPaswword(e.target.value);
  };

  const forgotPasswordClick = async (e) => {
    e.preventDefault();
    setForgotPasswordClicked(true);

    let url = "https://localhost:9000/users";

    const res = await axios.get(url).catch((err) => {
      console.log(err);
      setChangePassErr(err?.response?.data);
    });
    if (!res) return;

    const found = res?.data.find((element) => element.username === username);
    if (!found) return;
    setUserID(found.userID);
    url = `https://localhost:9000/users/${found.userID}/forgetPassword`;

    await axios.post(url).catch((err) => {
      console.log(err);
      setChangePassErr(err?.response.data);
      return true;
    });
    return true;
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setLoginTry(true);

    // localStorage.setItem("isLoggedin", true);
    // setTimeout(() => {
    //   localStorage.setItem("isLoggedin", false);
    // }, 20000);

    const url = "https://localhost:9000/login/";

    try {
      const res = await axios
        .post(
          url,
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .catch((err) => {
          if (
            err.response?.status === 401 ||
            username === "" ||
            password === ""
          ) {
            return loginPage();
          }
        });

      if (res?.status === 200 && res.data === "loggin Succeeded!") {
        setisLogIn(true);
        setLoginTry(true);
      }
    } catch (err) {
      console.log(err);
      setisLogIn(false);
    }
  };

  if (!isLogIn) {
    return loginPage();
  }
  return CustomersPage();
};

export default SignIn;
