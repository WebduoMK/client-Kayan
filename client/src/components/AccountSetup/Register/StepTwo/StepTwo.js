import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../../../FormsUI/Textfield";
import React from "react";

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  const FORM_VALIDATION = Yup.object().shape({
    address: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
    ssn: Yup.number()
      .test("len", "Must be exactly 9 characters", (val) => {
        if (val != null) return val.toString().length === 9;
        else return false;
      })
      .required("Required"),
    cellPhone: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={props.data}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Textfield name="address" label="Address" />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Textfield name="dob" type="date" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="ssn" label="Security Number" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="cellPhone" label="Cell Phone" />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right", marginTop: "2rem" }}>
              <Button
                className="registerButton2"
                onClick={() => props.prev(values)}
                variant="contained"
                color="primary"
                size="large"
              >
                Back
              </Button>

              <Button
                className="registerButton"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default StepTwo;
