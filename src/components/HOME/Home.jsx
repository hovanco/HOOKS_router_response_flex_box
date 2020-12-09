import React, { useState, useRef } from "react";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import "./home.scss";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

function Home() {
  const { register, handleSubmit, errors, watch, reset, getValues } = useForm(
    {}
  );

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

  const navigationToAboutComponent = () => {
    history.push("/");
  };
  // const navigationToAboutComponent = () => {
  //   history.go(1);
  // };

  const navigationToDashboardComponent = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <Router>
        <div className="wrapper">
          <div className="container">
            <div className="show-infor">
              <div className="address-icon">
                <h1>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  {/* ADDRESS */}
                </h1>
                {/* <h1>25-25 2/9 </h1> */}
              </div>
              <div className="email-icon">
                <h1>
                  {/* <i className="fa fa-envelope" aria-hidden="true"></i> EMAIL */}
                </h1>
                {/* <h1>johnCena.com</h1> */}
              </div>
            </div>

            <div className="required-infor">
              <div className="register-user">
                <form onSubmit={handleSubmit(onSubmit)} className="home">
                  <div className="form-row">
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
                  </div>
                  <div className="form-row">
                    <label>Password</label>
                    <input
                      aria-label="Enter your password"
                      aria-required="true"
                      placeholder="Password"
                      className="form-text"
                      type="password"
                      name="password"
                      ref={register({
                        required: "Password required",
                        minLength: { value: 8, message: "Too short" },
                      })}
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </div>
                  <div className="form-row">
                    <label>Confirm Password</label>
                    <input
                      aria-label="Enter your password to confirm"
                      aria-required="true"
                      placeholder="Confirm Password"
                      className="form-text"
                      type="password"
                      name="confirm"
                      ref={register({
                        validate: (value) => {
                          if (value === getValues("password")) {
                            return true;
                          } else {
                            return (
                              <span style={{ color: "red" }}>
                                Password fields don't match.
                              </span>
                            );
                          }
                        },

                        required: "Password required",
                        minLength: { value: 8, message: "Too short" },
                      })}
                    />
                    {errors.confirm && (
                      <p style={{ color: "red" }}>{errors.confirm.message}</p>
                    )}
                  </div>
                  <div className="btn-style-home">
                    <div
                      className="btn-item"
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      <button
                        // type="submit"
                        defaultValue="Submit"
                        className="btn-submit-home"
                      >
                        SEND
                      </button>
                      <button
                        type="button"
                        className="btn-reset-home"
                        onClick={onReset}
                      >
                        RESET
                      </button>
                      <button
                        type="button"
                        className="btn-about-home "
                        onClick={navigationToAboutComponent}
                      >
                        Go About
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard-home "
                        onClick={navigationToDashboardComponent}
                      >
                        Go Dashboard
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
export default Home;
