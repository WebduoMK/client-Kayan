import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../../FormsUI/Textfield/';
import Select from './../../../FormsUI/Select/index';
import FormControl from '@mui/material/FormControl';
import React from 'react';

// const INITIAL_FORM_STATE = {
//   accountHolderName: "",
//   typeOfBankAccount: "",
//   routingNumber: "",
//   bank: "",
//   accountNumber: "",
//   confirmAccountNumber: "",
// };

const banks = ['Bank A', 'Bank B', 'Bank C', 'Bank D', 'Bank E'];

const BankAccount = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  // const FORM_VALIDATION = Yup.object().shape({
  //   accountHolderName: Yup.string().required("Required"),
  //   typeOfBankAccount: Yup.string().required("Required"),
  //   routingNumber: Yup.number()
  //     .test("len", "Must be exactly 9 characters", (val) => {
  //       if (val != null) return val.toString().length === 9;
  //       else return false;
  //     })
  //     .required("Required"),
  //   bank: Yup.string().required("Required"),
  //   accountNumber: Yup.number().test(
  //     "das",
  //     "Must to be from 6 to 17 characters",
  //     (das) => das.toString().length >= 6 && das.toString().length <= 17
  //   ),
  //   confirmAccountNumber: Yup.number().required(),
  // });

  const FORM_VALIDATION = Yup.object().shape({
    accountHolderName: Yup.string().required('Required'),
    routingNumber: Yup.number().required(),
    bank: Yup.string().required('Required'),
    bankNumber: Yup.string().required('Required'),
    accountNumber: Yup.number().required(),
    confirmAccountNumber: Yup.number().required(),
  });
  return (
    <Formik
      initialValues={props.data}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="accountHolderName" label="Account Holder Name" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Select name="bank" label="Bank" options={banks} />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="routingNumber" label="Routing Number" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="bankNumber" label="Bank" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="accountNumber" label="Account Number" />{' '}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield
                name="confirmAccountNumber"
                label="Confirm Account Number"
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right', marginTop: '5rem' }}>
              <Button
                href="/congratulations"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ marginRight: { xs: '0', lg: '1rem' } }}
              >
                Skip for now
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ marginLeft: '1rem', marginTop: { xs: '2rem', sm: '0' } }}
              >
                Add Bank Account
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default BankAccount;
