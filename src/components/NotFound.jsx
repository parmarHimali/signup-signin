import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center mt-5 gap-2">
      <h3 className="text-secondary">404, Page not Found!</h3>
      <Link to="/">
        <Button>Back to Home page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
