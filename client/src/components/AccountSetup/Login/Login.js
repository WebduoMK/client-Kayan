import React from 'react';
import styles from './Login.module.css';
import { ReactComponent as Logo } from '../../../assets/white-logo.svg';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Hidden from '@mui/material/Hidden';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Textfield from './../../FormsUI/Textfield';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
  };
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Required'),
    password: Yup.string().required('Reqired'),
  });
  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0 }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={4}
        sx={{ bgcolor: 'primary.main' }}
      >
        <Logo />
      </Grid>

      {/* VTOR DEL */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={8}
      >
        <Link
          href="/register"
          underline="none"
          variant="body1"
          sx={{
            position: 'absolute',
            top: '3rem',
            right: '3rem',
            color: { xs: '#fff', sm: '#fff', md: '#000' },
          }}
        >
          {'Create an account'}
        </Link>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            paddingLeft: '5rem',
            marginRight: '5rem',
            width: { xs: '30rem', sm: '40rem', md: '50rem' },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              marginBottom: '8rem',
              fontWeight: 700,
            }}
          >
            Log in to Kayan
          </Typography>

          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              console.log('Form Submitted', values);

              const response = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                body: JSON.stringify({
                  ...values,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const data = await response.json();
              if (data.accessToken) {
                window.localStorage.accessToken = data.accessToken;
                window.localStorage.refreshToken = data.refreshToken;
                window.localStorage.user = JSON.stringify(data.user);
                navigate('/bank-account');
              }
              console.log(data);
            }}
          >
            <Form id="register_form_step_1">
              <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Textfield name="email" label="Email" />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Textfield name="password" label="Password" type="password" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ textAlign: 'right', alignSelf: 'flex-end' }}
                >
                  <Link
                    href="/forgot-password"
                    underline="none"
                    variant="body1"
                  >
                    {'Forgot password?'}
                  </Link>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ textAlign: 'right', alignSelf: 'flex-end' }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginTop: '2rem' }}
                  >
                    Log in
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

export default Login;
