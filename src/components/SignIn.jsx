import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const err = {};
      if (values.email.trim() === "") {
        err.email = "provide an email address";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)
      ) {
        err.email = "please provide valid email format";
      }
      if (values.password.trim() == "") {
        err.password = "Password is required";
      }
      return err;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/login`, values);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("User login successfully!");
        navigateTo("/");
      } catch (error) {
        toast.error("Invalid email or password");
        console.log(error);
      }
      resetForm();
    },
  });

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col
            lg={{ span: 6, offset: 3 }}
            className="form-container p-4 rounded"
          >
            <h3 className="text-primary text-center">Sign In</h3>
            <Form onSubmit={formik.handleSubmit} noValidate={true}>
              <Form.Group className="mb-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  value={formik.values.email}
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value.trimStart())
                  }
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <Form.Text className="text-danger">
                    {formik.errors.email}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  value={formik.values.password}
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value.trimStart())
                  }
                  onBlur={formik.handleBlur}
                  name="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <Form.Text className="text-danger">
                    {formik.errors.password}
                  </Form.Text>
                )}
              </Form.Group>
              <div>
                Don't have an account?
                <Link className="ms-2" to="/signup">
                  Sign Up
                </Link>
              </div>
              <Button type="submit" className="mt-3">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
