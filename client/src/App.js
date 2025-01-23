import React from "react";

import "./css/App.scss";
import { LoginPage } from "./Pages/LoginPage";

import { SignupPage } from "./Pages/SignupPage";
import { Switch, Route } from "react-router-dom";
import { AddAudio } from "./Pages/AddAudio";
import AddAudio2 from "./Pages/AddAudio2";
import { Search } from "./Pages/Search";
import jwt from "jsonwebtoken";

import { AdminPanel } from "./Pages/AdminPanel";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  var isloggedin = false;
  var isAdmin = false;

  if (localStorage.token) {
    jwt.verify(localStorage.token, "longer-secret-is-better", (err, res) => {
      if (err) {
        isloggedin = false;
        localStorage.clear();
        isAdmin = false;
      } else {
        if (localStorage.is_admin) {
          isAdmin = true;
        }
        isloggedin = true;
      }
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Switch>
        <Route exact path="/">
          <Search data={isloggedin} isAdmin={isAdmin} />
        </Route>
        <Route path="/login">
          <LoginPage data={isloggedin} isAdmin={isAdmin} />
        </Route>
        <Route path="/signup">
          <SignupPage data={isloggedin} isAdmin={isAdmin} />
        </Route>
        <Route path="/addAudio">
          <AddAudio data={isloggedin} isAdmin={isAdmin} />
        </Route>
        <Route path="/addAudio2">
          <AddAudio2 data={isloggedin} isAdmin={isAdmin} />
        </Route>
        <Route path="/admin">
          <AdminPanel data={isloggedin} isAdmin={isAdmin} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
