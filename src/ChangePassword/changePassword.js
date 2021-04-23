import React, { useState } from "react";
import "./changePassword.css";
import * as actions from "../Store/Actions/auth";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, InputGroup, Input, Label } from "reactstrap";
import NavigationItems from "../Navigation/NavigationItems/navigationItems";
import { changePassword } from "../Api/Api";
import BackDrop from "../Shared/Backdrop/Backdrop";
import Spinner from "../Shared/Spinner/Spinner";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const ChangePassword = (props) => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: true,
    newPassword: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const passwordChangeHandler = () => {
    if (password.newPassword === password.confirmPassword) {
      let data = {
        oldPassword: password.currentPassword,
        newPassword: password.newPassword,
      };
      setIsLoading(true);
      changePassword(data)
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("token", res.token);
          props.passwordChangeHandler(res.token);
          props.history.push("/dashboard");
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err.message);
        });
    } else {
      alert("Password does not match");
    }
  };
  const onChangeHandler = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const changeVisibility = (event) => {
    setPasswordVisible({
      ...passwordVisible,
      [event.target.name]: !passwordVisible[event.target.name],
    });
  };
  return (
    <>
      <BackDrop show={isLoading}>
        <Spinner />
      </BackDrop>
      <div className="changePassword">
        <NavigationItems />
        <div className="changePasswordBox w-100 mx-auto">
          <div className="formBox">
            <form>
              <Label className="fw-bold text-black ">Current Password</Label>
              <span style={{ color: "red" }}>*</span>
              <InputGroup>
                <Input
                  classes="border-top-0 border-left-0 border-right-0 rounded-0"
                  autoComplete="cc-csc"
                  onChange={onChangeHandler}
                  value={password.currentPassword}
                  type={passwordVisible.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Enter current Password"
                  id="currentPasswordfloatingInput"
                />
                <Button
                  name="currentPassword"
                  style={{ backgroundColor: "lightgrey" }}
                  onClick={changeVisibility}
                >
                  {passwordVisible.currentPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </Button>
              </InputGroup>
              <Label className="fw-bold text-black ">New Password</Label>
              <span style={{ color: "red" }}>*</span>
              <InputGroup>
                <Input
                  classes="border-top-0 border-left-0 border-right-0 rounded-0"
                  autoComplete="cc-csc"
                  onChange={onChangeHandler}
                  value={password.newPassword}
                  type={passwordVisible.newPassword ? "text" : "password"}
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new Password"
                  id="newPasswordfloatingInput"
                />
                <Button
                  name="newPassword"
                  style={{ backgroundColor: "lightgrey" }}
                  onClick={changeVisibility}
                >
                  {passwordVisible.newPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </Button>
              </InputGroup>
              <Label className="fw-bold text-black ">
                Confirm new Password
              </Label>
              <span style={{ color: "red" }}>*</span>
              <InputGroup>
                <Input
                  classes="border-top-0 border-left-0 border-right-0 rounded-0"
                  autoComplete="cc-csc"
                  onChange={onChangeHandler}
                  value={password.confirmPassword}
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  id="confirmPasswordfloatingInput"
                  for="floatingInput"
                />
                <Button
                  name="confirmPassword"
                  style={{ backgroundColor: "lightgrey" }}
                  onClick={changeVisibility}
                >
                  {passwordVisible.confirmPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </Button>
              </InputGroup>
              <Button
                color="primary"
                onClick={passwordChangeHandler}
                className="loginButton"
              >
                Change password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passwordChangeHandler: (data, props) =>
      dispatch(actions.passwordChangeHandler(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChangePassword));
