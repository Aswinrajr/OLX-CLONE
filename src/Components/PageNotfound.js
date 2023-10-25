import React from "react";
import './PageNotfound.css'
import { useNavigate } from "react-router-dom";

function PageNotfound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')}>Back to home</button>
    </div>
  );
}

export default PageNotfound;
