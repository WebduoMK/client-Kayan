import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Sidebar from './../../MainPage/Sidebar/Sidebar';
import { Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import TextfieldWrapper from '../../FormsUI/Textfield';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const EditProfile = (props) => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [traditional, setTraditional] = useState(null);
  const [roth, setRoth] = useState(null);

  useEffect(async () => {
    const response = await fetch(`http://localhost:5000/logged-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.accessToken}`,
      },
    });
    const data = await response.json();
    setUser(data);

    const accRes = await fetch(`http://localhost:5000/api/accounts/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.accessToken}`,
      },
    });
    const accountRes = await accRes.json();
    setAccount(accountRes);

    setTraditional(accountRes[0].traditional);
    setRoth(accountRes[0].roth);
  }, []);

  // Password
  const INITIAL_FORM_STATE = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  const FORM_VALIDATION = Yup.object().shape({
    currentPassword: Yup.string().required('Reqired'),
    newPassword: Yup.string().required('Reqired'),
    confirmPassword: Yup.string().required('Reqired'),
  });

  const handlePasswordSubmit = () => {
    console.log(INITIAL_FORM_STATE);
  };

  return (
    <Grid container sx={{ backgroundColor: '#F8F8F8' }}>
      <Grid
        container
        sx={{
          marginLeft: { xs: '0px', lg: '300px' },
          width: '100%',
          px: 5,
          py: '100px',
        }}
      >
        <Typography variant="h2" pb="20px">
          Settings
        </Typography>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            padding: '30px 75px',
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: '800', textAlign: 'left', paddingBottom: '80px' }}
          >
            Personal Information
          </Typography>

          <Grid container spacing="25px">
            <Grid
              container
              flexDirection="column"
              xs={12}
              md={3}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Avatar
                sx={{
                  width: '12rem',
                  height: '12rem',
                  mb: '2rem',
                }}
              >
                <PersonOutlineIcon />
              </Avatar>
              <Button variant="contained">Change</Button>
            </Grid>

            <Grid item xs={12} md={4.5}>
              <Typography variant="h3" sx={{ textAlign: 'left', pb: '10px' }}>
                First Name
              </Typography>
              <TextField
                disabled
                value={user?.firstName}
                sx={{ width: '100%', pb: '20px' }}
              />
              <Typography
                variant="h3"
                sx={{ textAlign: 'left', pb: '10px', paddingTop: '20px' }}
              >
                Email
              </Typography>
              <TextField disabled value={user?.email} sx={{ width: '100%' }} />
            </Grid>

            <Grid item xs={12} md={4.5}>
              <Typography variant="h3" sx={{ textAlign: 'left', pb: '10px' }}>
                Last Name
              </Typography>
              <TextField
                disabled
                value={user?.lastName}
                sx={{ width: '100%', pb: '20px' }}
              />
              <Typography
                variant="h3"
                sx={{ textAlign: 'left', pb: '10px', paddingTop: '20px' }}
              >
                Mobile Navbar
              </Typography>
              <TextField
                disabled
                value={user?.cellPhone}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="h3"
            sx={{
              fontWeight: '800',
              textAlign: 'left',
              paddingBottom: '50px',
              paddingTop: '80px',
            }}
          >
            Change Password
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              console.log('Form Submitted', values);

              const response = await fetch(
                `http://localhost:5000/api/change-password`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    ...values,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.accessToken}`,
                  },
                }
              );
              const data = await response.json();

              console.log(data);
            }}
          >
            <Form>
              <Grid container spacing="25px">
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: 'left', pb: '10px' }}
                  >
                    Current Password
                  </Typography>

                  <TextfieldWrapper
                    name="currentPassword"
                    sx={{ width: '100%', pb: '20px' }}
                    type="password"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: 'left', pb: '10px' }}
                    type="password"
                  >
                    New Password
                  </Typography>
                  <TextfieldWrapper
                    name="newPassword"
                    sx={{ width: '100%', pb: '20px' }}
                    type="password"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: 'left', pb: '10px' }}
                  >
                    Confirm Password
                  </Typography>
                  <TextfieldWrapper
                    name="confirmPassword"
                    sx={{ width: '100%', pb: '20px' }}
                    type="password"
                  />
                </Grid>
                <Grid item sx={{ marginTop: '2rem', justifySelf: 'center' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>

          {/*     Third part --> Bank Acc | IRA Account  */}
          <Grid container>
            <Grid container xs={12} md={6}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '800',
                    textAlign: 'left',
                    paddingBottom: '50px',
                    paddingTop: '80px',
                  }}
                >
                  Bank Account
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6.5} md={6}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: 'left',
                    lineHeight: '2.5rem',
                  }}
                >
                  {account ? account[0].bank : ''}
                </Typography>
                <Typography
                  variant="h3"
                  color="#9FA6AB"
                  sx={{
                    textAlign: 'left',
                    lineHeight: '2.5rem',
                  }}
                >
                  {account ? account[0].bankNumber : ''}
                </Typography>

                <Typography
                  variant="h3"
                  color="#9FA6AB"
                  sx={{
                    textAlign: 'left',
                    lineHeight: '2.5rem',
                  }}
                >
                  {account ? account[0].routingNumber : ''}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={3}
                sx={{ alignSelf: 'center', justifySelf: 'center' }}
              >
                <EditIcon
                  sx={{
                    width: '2.5rem !important',
                    height: '2.5rem !important',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container md={6}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: '800',
                    textAlign: 'left',
                    paddingBottom: '50px',
                    paddingTop: '80px',
                  }}
                >
                  IRA Account
                </Typography>
              </Grid>
              <Grid item xs={9} sm={4.5}>
                <Typography
                  variant="h3"
                  color={traditional > 0 ? 'black' : '#9FA6AB'}
                  sx={{
                    textAlign: 'left',
                    lineHeight: '2.5rem',
                  }}
                >
                  Traditional IRA
                </Typography>
                <Typography
                  variant="h3"
                  color={roth > 0 ? 'black' : '#9FA6AB'}
                  sx={{
                    textAlign: 'left',
                    lineHeight: '2.5rem',
                  }}
                >
                  Roth IRA
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {traditional > 0 ? (
                  <CheckCircleOutlineIcon
                    sx={{
                      width: '2.5rem !important',
                      height: '2.5rem !important',
                    }}
                  />
                ) : (
                  <CancelOutlinedIcon
                    color="grayText"
                    sx={{
                      width: '2.5rem !important',
                      height: '2.5rem !important',
                    }}
                  />
                )}
                <br />
                {roth > 0 ? (
                  <CheckCircleOutlineIcon
                    sx={{
                      width: '2.5rem !important',
                      height: '2.5rem !important',
                    }}
                  />
                ) : (
                  <CancelOutlinedIcon
                    color="grayText"
                    sx={{
                      width: '2.5rem !important',
                      height: '2.5rem !important',
                    }}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={1}
                md={4.5}
                sx={{ alignSelf: 'center', justifySelf: 'center' }}
              >
                <EditIcon
                  sx={{
                    width: '2.5rem !important',
                    height: '2.5rem !important',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
