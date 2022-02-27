import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../../FormsUI/Textfield';
import Checkbox from '../../../FormsUI/Checkbox';
import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../theme';

const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email.').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same'
      ),
    }),
    termsOfService: Yup.boolean()
      .oneOf([true], 'The terms and conditions must be accepted.')
      .required('The terms and conditions must be accepted.'),
  });

  return (
    <Formik
      initialValues={props.data}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid container spacing={2} className="registerPage">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="firstName" label="First Name" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield name="lastName" label="Last Name" />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Textfield name="email" label="Email" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield type="password" name="password" label="Password" />{' '}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Textfield
                type="password"
                name="confirmPassword"
                label="Confirm Password"
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: 'left', marginTop: '5rem' }}
            >
              <Checkbox
                name="termsOfService"
                label="I agree to the Terms and Conditions and Privacy Policy"
                className="registerPage"
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="registerButton"
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

export default StepOne;
