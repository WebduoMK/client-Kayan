import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as VerifiedProfile } from '../../../assets/verified_profile.svg';
import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const SuccessfullyVerified = () => {
  const navigate = useNavigate();
  const { emailToken } = useParams();
  useEffect(async () => {
    const url = `http://localhost:5000/api/confirm/${emailToken}`;
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(result.json());
  }, []);

  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="2.5rem"
        xs={12}
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

        <Typography variant="h1">
          Your email has been successfully verified!
        </Typography>
        <Typography variant="h2" color="#9FA6AB" sx={{ fontWeight: '300' }}>
          Proceed to login{' '}
        </Typography>

        <VerifiedProfile sx={{ alignSelf: 'center', justifySelf: 'center' }} />

        <Button
          onClick={() => navigate('/login')}
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: '0',
            right: { xs: '50vw', md: '12rem' },
            marginBottom: '8rem',
          }}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuccessfullyVerified;
