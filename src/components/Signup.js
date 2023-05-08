import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uni, setUni] = useState("");

  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    let attributeList = [
      new CognitoUserAttribute({
        Name: "given_name",
        Value: firstName.trim(),
      }),
      new CognitoUserAttribute({
        Name: "family_name",
        Value: lastName.trim(),
      }),
      new CognitoUserAttribute({
        Name: "custom:uni",
        Value: uni.trim(),
      }),
    ];

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        setError(err.message);
        console.error(err);
      } else {
        setError("You have created an account successfully!");
        setVerifying(true);
      }
      console.log(data);
    });
  };

  const onVerify = (event) => {
    event.preventDefault();

    let user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    console.log(user);

    user.confirmRegistration(code, true, (err, data) => {
      if (err) {
        setError(err.message);
        console.error(err);
      } else {
        setError("You have verified your account!");
        window.location.href = "/login";
      }
    });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Paper elevation={3} style={{ padding: "40px 30px" }}>
          {!verifying ? (
            <Box component="form" onSubmit={onSubmit}>
              <Stack direction="column" spacing={3} width="400px">
                <Typography variant="h4">Admin Registration</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="First name"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value.trim())
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value.trim())}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Columbia UNI"
                    value={uni}
                    onChange={(event) => setUni(event.target.value.trim())}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value.trim())}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value.trim())}
                  />
                </FormControl>
                <Button variant="contained" type="submit" size="large">
                  Register
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box component="form" onSubmit={onVerify}>
              <Stack direction="column" spacing={3} width="400px">
                <Typography variant="h4">Account Verification</Typography>
                {/* {error && <Alert severity="error">{error}</Alert>} */}
                <Typography variant="body1">
                  Please enter the verification code sent to your email.
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Verification Code"
                    value={code}
                    onChange={(event) => setCode(event.target.value.trim())}
                  />
                </FormControl>
                <Button variant="contained" type="submit" size="large">
                  Verify
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
