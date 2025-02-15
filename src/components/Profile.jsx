import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigateTo = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("User logout successfully!");
    navigateTo("/signin");
  };
  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center">
      <h2>Profile</h2>
      <Card>
        <Card.Body>
          <Card.Img
            variant="top"
            src={`${BASE_URL}/${user.img}`}
            style={{ width: "300px", marginBottom: "20px" }}
          />
          <Card.Title>Username: {user.username}</Card.Title>
          <hr />
          <Card.Subtitle>Email: {user.email}</Card.Subtitle>
          <div>
            <p className="mb-0">
              <b>Mobile Number:</b> {user.phone}
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
            <Button onClick={handleLogout} className="my-2">
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
