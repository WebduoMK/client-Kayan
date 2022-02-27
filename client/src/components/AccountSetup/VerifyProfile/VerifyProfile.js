import React from 'react';
import Grid from '@mui/material/Grid';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as UnverifiedProfile } from '../../../assets/unverifiedProfile.svg';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerifyProfile = () => {
  const navigate = useNavigate();
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

        <Typography
          variant="h1"
          style={{
            fontFamily: 'NotoSans-Medium',
            fontSize: '4.4rem',
            fontWeight: 700,
          }}
        >
          Verify your profile
        </Typography>
        <Typography
          variant="h2"
          color="#9FA6AB"
          sx={{ fontWeight: '300' }}
          style={{
            fontFamily: 'NotoSans-Medium',
            fontSize: '2.4rem',
            fontWeight: 300,
          }}
        >
          Check you email{' '}
        </Typography>

        <UnverifiedProfile
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
        />
      </Grid>
    </Grid>
  );
};

export default VerifyProfile;
