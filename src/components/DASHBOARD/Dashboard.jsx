import React, { useState, useRef } from "react";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import "./dashboard.scss";

import { BrowserRouter as Router, useHistory } from "react-router-dom";

function Dashboard() {
  const { register, handleSubmit, errors, watch, reset } = useForm({});

  const [value, setValues] = useState();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    // c1: data.phone = value
    alert(JSON.stringify({ ...data, phone: value }));
  };

  const onReset = () => {
    setValues("");
    reset("");
  };

  const history = useHistory();
  // history.replace: from page3 to page1,
  // history.goBack: come back 1 page <==> history.go(-1),
  // history.goForward(): go to 1 page <==> history.go(1)

  // replace: from page3 to page1, goBack: come back 1 page
  // const navigationToHomePage = () => {
  //   history.push("/");
  // };
  // const navigationToHomePage = () => {
  //   // come back a page
  //   history.goBack();
  // };
  const navigationToHomePage = () => {
    history.push("/home");
  };

  // const navigationToAboutPage = () => {
  //   history.push("/about");
  // };
  const navigationToAboutPage = () => {
    history.replace("/");
  };

  return (
    <>
      <Router>
        <div className="wrapper-dashboard">
          <div className="container-dashboard">
            <div className="required-information-dashboard">
              <div className="register-user">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Rain"
                    ref={register({
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/,
                    })}
                  />
                  {_.get("firstName.type", errors) === "required" && (
                    <p className="p-tag-of-input">This field is required</p>
                  )}
                  {_.get("firstName.type", errors) === "maxLength" && (
                    <p>First name cannot exceed 20 characters</p>
                  )}
                  {_.get("firstName.type", errors) === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Ho"
                    ref={register({
                      required: true,
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/,
                    })}
                  />
                  {_.get("lastName.type", errors) === "required" && (
                    <p className="p-tag-of-input">This field is required</p>
                  )}
                  {_.get("lastName.type", errors) === "maxLength" && (
                    <p>First name cannot exceed 20 characters</p>
                  )}
                  {_.get("lastName.type", errors) === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}

                  <button
                    type="submit"
                    defaultValue="Submit"
                    className="btn-submit-dashboard btn-style-dashboard "
                  >
                    SEND
                  </button>
                  <button
                    type="button"
                    className="btn-reset-dashboard btn-style-dashboard"
                    onClick={onReset}
                  >
                    RESET
                  </button>
                  <button
                    type="button"
                    className="btn-home-dashboard btn-style-dashboard"
                    onClick={navigationToHomePage}
                  >
                    Go Home
                  </button>
                  <button
                    type="button"
                    className="btn-about-dashboard btn-style-dashboard"
                    onClick={navigationToAboutPage}
                  >
                    Go About
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
export default Dashboard;
