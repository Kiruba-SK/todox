import React, { useRef } from "react";

// recoil js
import { useRecoilState } from "recoil";
import userInfoAtom from "../../recoil/userInfoAtom";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

const LoginCard = () => {
  //global variables
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  // local variables
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // functions
  const onSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    };

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.message === "Successfully logined") {
          localStorage.setItem("userStatus", true);
          setUserInfo(true);
        } else {
          localStorage.setItem("userStatus", false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <div className="login-card-container">
        <div>
          <h1 className="login-heading">TodoX</h1>
        </div>
        <form onSubmit={onSubmit}>
          <input
            className="login-inputs"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <input
            className="login-inputs"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />

          <button className="login-button" type="submit" >
            Login
          </button>
        </form>
        <h4 className="or-style">Or</h4>
        <div className="new-user">
          <NavLink to="/newuser">Create new user</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;


