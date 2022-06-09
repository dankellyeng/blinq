import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

const Error = styled.div`
  padding: 0;
  margin-bottom: 8px;
  align-self: flex-start;
  color: red;
  font-size: 12px;
`;

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Email does not match")
    .required("Required"),
});

export default function CustomModal(props) {
  const { openModal, parentCallBack } = props;
  const [open, setOpen] = useState(openModal);
  const [error, setError] = useState(undefined);
  const [activity, setActivity] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState();

  useEffect(() => {}, [error]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ color: "black" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Request an invite
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 450,
            alignSelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              alignSelf: "center",
            }}
          >
            <p style={{ alignSelf: "center" }}>Request an invite</p>
            <Formik
              initialValues={{
                name: "",
                email: "",
                confirmEmail: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                let payload = JSON.stringify({
                  name: values.name,
                  email: values.email,
                });
                console.log(payload);

                setActivity(true);

                axios
                  .post(
                    `https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth`,
                    {
                      payload,
                    }
                  )
                  .then((res) => {
                    setActivity(false);
                    parentCallBack(true);
                    setOpen(false);
                  })
                  .catch((error) => {
                    setActivity(false);
                    console.log("There was an error!", error?.response.data);
                    setError("Error: " + error?.response.data.errorMessage);
                  });
                handleClose;
              }}
            >
              {({
                handleSubmit,
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
              }) => (
                <Form
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <TextField
                    style={{ marginBottom: 2 }}
                    // autoFocus //if on it causes the error to show on open
                    autoComplete={"name"}
                    name="name"
                    id="name"
                    label="Full Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name ? (
                    <Error>{errors.name}</Error>
                  ) : (
                    <div style={{ height: 20 }}></div>
                  )}

                  <TextField
                    style={{ marginBottom: 2 }}
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <Error>{errors.email}</Error>
                  ) : (
                    <div style={{ height: 20 }}></div>
                  )}

                  <TextField
                    name="confirmEmail"
                    style={{ marginBottom: 2 }}
                    id="name"
                    label="Confirm Email Address"
                    type="email"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    value={values.confirmEmail}
                  />
                  {errors.confirmEmail && touched.confirmEmail ? (
                    <Error>{errors.confirmEmail}</Error>
                  ) : (
                    <div style={{ height: 20 }}></div>
                  )}
                  {error ? <Error>{error}</Error> : null}

                  {activity && <CircularProgress />}

                  <Button
                    style={{
                      width: "90%",
                      alignSelf: "center",
                      marginBottom: 20,
                      marginTop: 10,
                    }}
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid}
                  >
                    Subscribe
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
