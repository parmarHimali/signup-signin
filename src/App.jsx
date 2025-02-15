import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.css";
import SignIn from "./components/SignIn";
import { data, Route, Routes } from "react-router-dom";
import "./index.css";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import axios from "axios";

// export const BASE_URL = "http://192.168.29.178:3000";
export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "http://192.168.29.118:3000";
const App = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${BASE_URL}/getall`);
      setUsers(data.data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Signup setUsers={setUsers} users={users} />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" Component={Profile} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
