import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseContext } from "./Store/FirebaseContext";
import Context from "./Store/FirebaseContext";
import firebase from "./Firebase/config";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,

);
