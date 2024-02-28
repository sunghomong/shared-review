import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import "./style.css";

const Authentication = () => {
  //          state: 화면 상태        //
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  const test = () => {};

  const SignIn = () => {
    return (
      <div id="sign-in-wrap">
        <div className="auth-sign-in-top">
          <div className="sign-in-title">로그인</div>
          <div className="sign-in-input-box">
            <input type="text" name="userName" placeholder="Email" />
            <input type="password" name="userPassword" placeholder="Password" />
            <div className="sign-in-login-btn" onClick={test}>
              {"로그인"}
            </div>
          </div>
        </div>

        <div className="auth-sign-in-bottom">
          <div className="sign-in-access-options">
            <ul>
              <li>
                <div className="auth-description-link" onClick={test}>
                  {"이메일 찾기"}
                </div>
              </li>
              <li>
                <div className="auth-description-link" onClick={test}>
                  {"비밀번호 찾기"}
                </div>
              </li>
              <li>
                <div className="auth-description-link" onClick={test}>
                  {"회원가입"}
                </div>
              </li>
            </ul>
          </div>

          <div className="social_login_box">
            <div className="social_login_image-g"></div>
            <div className="social_login_image-k"></div>
            <div className="social_login_image-n"></div>
          </div>
        </div>
      </div>
    );
  };

  const SignUp = () => {
    return <div></div>;
  };

  return (
    <div id="auth-wrapper">
      <div className="auth-body-box">
        {view === "sign-in" && <SignIn />}
        {view === "sign-up" && <SignUp />}
      </div>
    </div>
  );
};

export default Authentication;
