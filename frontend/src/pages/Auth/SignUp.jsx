import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { API } from '../../configs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Codesh by Allan Bezerra
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get('username'),
      password: data.get('password'),
    }
    await axios.get(API.username + '/' + user.username, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (typeof response.data === "string") {
          localStorage.setItem('register', true)
        } else {
          localStorage.setItem('register', false)
        }
      })
      .catch((error) => {
        console.log('2')
        alert('error', error.response)
      })
    if (localStorage.getItem('register')) {
      await axios.post(API.user, user, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          localStorage.setItem('user', user.username);
          localStorage.setItem('password', user.password);
          alert('Usuario criado com sucesso')
        })
        .catch((error) => {
          alert('error', error.response)
        })
      await axios.post(API.auth, user, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          localStorage.setItem('token', response.data.access_token);
          window.location.href = '/'
        })
        .catch((error) => {
          alert('error', error.response)
        })
    } else {
      alert('User já existe!')
      window.location.href = '/login'
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}