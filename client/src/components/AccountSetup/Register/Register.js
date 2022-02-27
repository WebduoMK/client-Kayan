import React from 'react';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import { useNavigate } from 'react-router-dom';

// export default function Register()
const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsOfService: false,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = async (formData) => {
    console.log('Form Submitted', formData);

    const response = await fetch(`http://localhost:5000/api/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      navigate('/verify-profile');
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  const stepsLabels = ['', ''];

  console.log('data', data);

  return (
    <Grid
      container
      sx={{
        height: { xs: '160vh', sm: '130vh', md: '100vh' },
        width: '100vw',
        overflow: 'hidden',
      }}
      className="registerPage"
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={12}
        md={12}
        lg={8}
        xl={8}
        order={{ xs: 2, lg: 1 }}
      >
        <Logo
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            marginTop: '3rem',
            marginLeft: '4rem',
          }}
        />
        <Typography
          variant="h2"
          sx={{ paddingBottom: '2rem' }}
          className="headingRegister"
        >
          Create an account
        </Typography>
        <Box
          sx={{
            width: '20%',
            fontSize: '3rem',
          }}
        >
          <Stepper
            activeStep={currentStep}
            sx={{
              alignContent: 'center',
              justifyContent: 'center',
              paddingBottom: '4rem',
            }}
          >
            {stepsLabels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          className="registerPage"
          sx={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {steps[currentStep]}
        </Box>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={12}
        md={12}
        lg={4}
        xl={4}
        sx={{ bgcolor: '#F5F5F5' }}
        order={{ xs: 1, lg: 2 }}
        className="registerPage"
      >
        <Typography
          variant="body1"
          sx={{ width: '50%' }}
          className="registerPage"
        >
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam,
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Register;
