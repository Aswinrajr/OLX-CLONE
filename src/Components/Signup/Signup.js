import React, { useState, useContext } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../Store/FirebaseContext";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Signup() {
  // const history = useHistory();
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    console.log(firebase);
    e.preventDefault();
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.user);
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                // history.push("/login");
                Swal.fire('User Registered Successfull', '', 'success')
                navigate("/login")
              });
          });
        });
    } catch (err) {
      console.log("Error in sign up", err);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img onClick={()=>navigate('/')} style={{ width: "200px", height: "200px" }} src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* <a href="">Login</a> */}
      </div>
    </div>
  );
}
