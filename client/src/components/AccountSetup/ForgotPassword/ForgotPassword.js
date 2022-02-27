import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as ForgotImg } from '../../../assets/forgotPass.svg';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Hidden from '@mui/material/Hidden';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Textfield from './../../FormsUI/Textfield';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = (props) => {
  const INITIAL_FORM_STATE = {
    email: '',
  };
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Required'),
  });

  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0 }}
    >
      <Logo
        style={{
          position: 'absolute',
          top: '3rem',
          left: '4rem',
        }}
      />
      <Hidden only={['xs', 'sm']}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <ForgotImg />
        </Grid>
      </Hidden>

      {/* VTOR DEL */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={12}
        md={6}
      >
        <Grid
          container
          direction="column"
          justifyContent="left"
          alignItems="left"
          sx={{
            width: { xs: '30rem', sm: '40rem', md: '50rem' },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'left',
              marginBottom: '8rem',
              fontWeight: 900,
            }}
          >
            Forgot your <br />
            Password?
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              const response = await fetch(
                `http://localhost:5000/api/request-reset-password`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    ...values,
                    redirectUrl: 'http://localhost:3000',
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              const data = await response.json();
              console.log(data);
            }}
          >
            <Form id="register_form_step_1">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Textfield name="email" label="Email" />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  spacing={3}
                  sx={{ textAlign: 'right', marginTop: '3rem' }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ marginRight: '1rem' }}
                  >
                    Back
                  </Button>

                  <Button
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
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
