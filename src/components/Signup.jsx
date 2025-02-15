import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Signup = ({ users, setUsers }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPswd: "",
      gender: "",
      terms_condition: false,
      img: null,
      city: "",
    },
    onSubmit: async (values, { resetForm, setFieldValue }) => {
      const formData = new FormData();
      formData.append("username", values.username.trim());
      formData.append("email", values.email.trim());
      formData.append("password", values.password.trim());
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("terms_condition", values.terms_condition);
      formData.append("img", values.img);
      formData.append("city", values.city);

      try {
        const { data } = await axios.post(`${BASE_URL}/signup`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUsers([...users, data.data]);
        toast.success("User registered successfully");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
      resetForm();
      setFieldValue("img", null);
    },
    validate: (values) => {
      const err = {};

      if (values.username.trim() == "") {
        err.username = "Username is required";
      }

      if (values.password.trim() == "") {
        err.password = "Password is required";
      } else if (values.password.length < 6) {
        err.password = "Password must contain atleast 6 characters";
      }

      if (values.confirmPswd.trim() === "") {
        err.confirmPswd = "Confirm password is required";
      } else if (values.password != values.confirmPswd) {
        err.confirmPswd = "password and confirm password didn't match";
      }

      if (values.email.trim() === "") {
        err.email = "Email is required!";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)
      ) {
        err.email = "please provide valid email format";
      }

      if (values.phone === "") {
        err.phone = "provide phone number";
      } else if (!/^\d{10}$/.test(values.phone)) {
        err.phone = "provide 10 digits phone number";
      }
      if (values.gender === "") {
        err.gender = "Please select gender";
      }
      if (values.city === "") {
        err.city = "please select city";
      }

      if (values.terms_condition === false) {
        err.terms_condition =
          "term & conditions must be accepted before Sign Up";
      }
      if (values.img == null) {
        err.img = "Please provide profile picture";
      } else if (!values.img.type.includes("image/")) {
        err.img = "Only image is required for profile.";
      }
      return err;
    },
  });

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col
            lg={{ span: 6, offset: 3 }}
            className="form-container p-4 rounded"
          >
            <h3 className="text-primary text-center">Sign Up</h3>
            <Form onSubmit={formik.handleSubmit} noValidate={true}>
              <Form.Group className="mb-2">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={formik.values.username}
                  onChange={(e) =>
                    formik.setFieldValue("username", e.target.value.trimStart())
                  }
                  onBlur={formik.handleBlur}
                  name="username"
                />
                {formik.errors.username && formik.touched.username && (
                  <Form.Text className="text-danger">
                    {formik.errors.username}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
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
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <Form.Text className="text-danger">
                    {formik.errors.phone}
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
              <Form.Group className="mb-2">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  value={formik.values.confirmPswd}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "confirmPswd",
                      e.target.value.trimStart()
                    )
                  }
                  name="confirmPswd"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPswd && formik.errors.confirmPswd && (
                  <Form.Text className="text-danger">
                    {formik.errors.confirmPswd}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="d-flex align-items-baseline gap-2 mb-2">
                <Form.Label>Gender:</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    inline
                    name="gender"
                    value="Male"
                    onChange={formik.handleChange}
                    className="me-1"
                    id="male"
                  />
                  <Form.Label htmlFor="male">Male</Form.Label>
                </div>
                <div>
                  <Form.Check
                    type="radio"
                    inline
                    name="gender"
                    value="Female"
                    onChange={formik.handleChange}
                    className="me-1"
                    id="female"
                  />
                  <Form.Label htmlFor="female">Female</Form.Label>
                </div>
                {formik.errors.gender && formik.touched.gender && (
                  <Form.Text className="text-danger d-block">
                    {formik.errors.gender}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>City:</Form.Label>
                <Form.Select
                  name="city"
                  onChange={formik.handleChange}
                  size="sm"
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select City</option>
                  <option value="Surat">Surat</option>
                  <option value="Bhavnagar">Bhavnagar</option>
                  <option value="Ahemdabad">Ahemdabad</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Rajkot">Rajkot</option>
                  <option value="Bharuch">Bharuch</option>
                  <option value="Anand">Anand</option>
                </Form.Select>
                {formik.errors.city && formik.touched.city && (
                  <Form.Text className="text-danger">
                    {formik.errors.city}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Profile Picture:</Form.Label>
                <Form.Control
                  size="sm"
                  type="file"
                  onChange={(e) =>
                    formik.setFieldValue("img", e.target.files[0])
                  }
                  className="mb-2"
                  name="img"
                  accept="image/*"
                />
                {formik.errors.img && formik.touched.img && (
                  <Form.Text className="text-danger">
                    {formik.errors.img}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check
                  type="checkbox"
                  inline
                  onChange={formik.handleChange}
                  checked={formik.values.terms_condition}
                  name="terms_condition"
                  id="terms_condition"
                />
                <Form.Label htmlFor="terms_condition">
                  Agree with terms & conditions
                </Form.Label>
                {formik.errors.terms_condition &&
                  formik.touched.terms_condition && (
                    <Form.Text className="text-danger d-block">
                      {formik.errors.terms_condition}
                    </Form.Text>
                  )}
              </Form.Group>
              <div>
                Already have an account?
                <Link className="ms-2" to="/signin">
                  Sign In
                </Link>
              </div>
              <Button type="submit" className="mt-3">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
