import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  let onSubmit = (e) => {
    e.preventDefault();
    navigate("/videocalling");
  };
  return (
    <div>
      <form id="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary" onClick={onSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
