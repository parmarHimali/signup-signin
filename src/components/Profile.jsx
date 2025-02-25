import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged in user: ", user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!user) {
      navigateTo("/signin");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("User logout successfully!");
    navigateTo("/signin");
  };
  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center">
      {user && (
        <>
          <h2 className="text-secondary mt-5 mb-2">
            Welcome, {user.username}.
          </h2>
          <Card style={{ width: "300px" }}>
            <Card.Body>
              <Card.Img
                variant="top"
                src={`${BASE_URL}/${user.img}`}
                alt="Profile Picture"
                style={{
                  height: "230px",
                  objectFit: "cover",
                  display: loading ? "none" : "block",
                }}
                className="mb-2 rounded w-100"
                onLoad={() => setLoading(false)}
              />
              {loading && (
                <p className="text-secondary text-center">Loading profile..</p>
              )}
              <Card.Title>{user.username}</Card.Title>
              <Card.Subtitle>Email: {user.email}</Card.Subtitle>
              <hr />
              <div>
                <p className="mb-0">
                  <b>Mobile:</b> {user.phone}
                </p>
                <p className="mb-0">
                  <b>Gender:</b> {user.gender}
                </p>
                <p className="mb-0">
                  <b>City:</b> {user.city}
                </p>

                <p className="mb-0">
                  <b>Terms & Conditions:</b>{" "}
                  {user.terms_condition ? "Accepted" : "Not accepted"}
                </p>
                <Button variant="dark" onClick={handleLogout} className="my-2">
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Profile;
