import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { FirebaseContext, AuthContext } from "../../Store/FirebaseContext";

const Create = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date();

  const handleSubmit = () => {
    if (user) {
      firebase
        .storage()
        .ref(`/image/${image.name}`)
        .put(image)
        .then(({ ref }) => {
          ref.getDownloadURL().then((url) => {
            console.log("URL IN CREATE: ", url);
           
            
            firebase.firestore({}).collection("products").add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            });
            Swal.fire('Product added for sell!', '', 'success')

            navigate("/");
          });
        });
    }else{
      Swal.fire('Please Login to Sell Product', '', 'info')
      navigate('/login')
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
