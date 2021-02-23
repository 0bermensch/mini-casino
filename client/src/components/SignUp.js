import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import { register } from "../actions/auth";

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const vusername = (value) => {
    if (value.length < 5 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 5 and 15 characters.
        </div>
      );
    }
  };

  // password must have at least 5 digits, 1 special char, 1 number, 1 letter
  const vpassword = (value) => {
    var passwordTest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
    if (!value.match(passwordTest)) {
      return (
        <div className="alert alert-danger" role="alert">
          Your password must contain at least 5 digits, 1 special character, 1
          number, and 1 letter
        </div>
      );
    }
  };

  // <div className="alert alert-danger" role="alert">
  //   Password do not match
  // </div>;
  // confirming password
  const vconfirmpassword = (confirmPassword, password) => {
    if (confirmPassword === password) {
      return true;
    } else {
      return false;
    }
  };

  // validate birthday over 18
  const vbirthday = (value) => {
    var optimizedBirthday = value.replace(/-/g, "/");

    var myBirthday = new Date(optimizedBirthday);

    var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";

    var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

    if (myAge < 18) {
      return (
        <div className="alert alert-danger" role="alert">
          Must be 18
        </div>
      );
    } else {
      return true;
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const onChangeBirthday = (e) => {
    const birthday = e.target.value;
    setBirthday(birthday);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="signup">
      <Form className="signup__form" onSumbit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="signup__username">
              <label className="signup__username--label" htmlFor="username">
                Username
              </label>
              <Input
                type="input"
                className="signup__username--input"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>
            <div className="signup__password">
              <label className="signup__password--label" htmlFor="password">
                Password
              </label>
              <Input
                type="input"
                className="signup__password--input"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>
            <div className="signup__confirmpassword">
              <label
                className="signup__confirmpassword--label"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <Input
                type="input"
                className="signup__confirmpassword--input"
                name="confirmpassword"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                validations={[required, vconfirmpassword]}
              />
            </div>
            <div className="signup__birthday">
              <label className="signup__birthday--label" htmlFor="birthday">
                Birthday
              </label>
              <Input
                type="date"
                className="signup__birthday--input"
                name="birthday"
                value={birthday}
                onChange={onChangeBirthday}
                validations={[required, vbirthday]}
              />
            </div>
            <div className="signup__button">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SignUp;
