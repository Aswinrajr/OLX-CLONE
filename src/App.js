import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext, FirebaseContext } from "./Store/FirebaseContext";

import "./App.css";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./Store/PostContext";
import PageNotfound from "./Components/PageNotfound";


function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/create" element={<Create />} />

            <Route path="/view" element={<ViewPost />} />

            <Route path="/*" element={<PageNotfound />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
