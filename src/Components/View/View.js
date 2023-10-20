import React, { useEffect, useState, useContext } from "react";

import "./View.css";
import { PostContext } from "../../Store/PostContext";
import { FirebaseContext } from "../../Store/FirebaseContext";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  console.log("User: ", userDetails, setUserDetails);
  console.log("PostDetails: ", postDetails);
  console.log("firebase: ", firebase);
  useEffect(() => {
    console.log("PostDetails", postDetails);
    const { userId } = postDetails;
    console.log("UserId", userId);
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log("doc.data: ", doc.data);
          setUserDetails(doc.data());
        });
      });
  }, [firebase, postDetails]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          style={{ width: "70%", height: "70%", margin: "50px" }}
          src={postDetails.url}
          alt=""
        />
      </div>
      <div
        className="rightSection"
        style={{ marginRight: "15%", marginTop: "5%" }}
      >
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       { userDetails &&
        <div className="contactDetails">
          <p>{userDetails.username}</p>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone}</p>
        </div>
}

      </div>
    </div>
  );
}
export default View;
