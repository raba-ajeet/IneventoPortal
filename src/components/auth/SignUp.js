
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ValidateUsername,ValidatePassword,ValidationTextField} from './validation';
import { Copyright } from './Copyright';
import Base from '../structure/Base';


import {signup} from '../auth/helper/Index';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [userName,setUserName] = useState();
  const [password,setPassword] = useState('');
  const [userNameValid,setUserNameValid]  =useState("");
  const [passwordValid,setPasswordValid]  =useState("");
  const onsubmit = (e) => {
    e.preventDefault(); 
    console.log("fgagdgagdas");
    var formData = new FormData();
    formData.set("email",userName);
    formData.set("password",password);
    console.log(formData);
    signup(formData)
    .then(data => {
      if(data.error){
        console.log("soem error is coming");
      }
      else{
        console.log(data);
      }
    })
  }
  return (
    <Base>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} >
          
           <ValidationTextField
            onChange = {(event)=>{setUserNameValid(ValidateUsername(event.target.value));setUserName(event.target.value)}}
            className={classes.margin}
            label="Username"
            margin="normal"
            required
            fullWidth
            variant="outlined"
            defaultValue=""
            id="validation-outlined-usernameSignup"
            error= {userNameValid.length!==0}
            helperText = {userNameValid}
          />

          <ValidationTextField
            onChange = {(event)=>{setPasswordValid(ValidatePassword(event.target.value));setPassword(event.target.value)}}
            className={classes.margin}
            label="Password"
            margin="normal"
            required
            fullWidth
            variant="outlined"
            defaultValue=""
            type="password"
            id="validation-outlined-passwordSignup"
            error= {passwordValid.length!==0}
            helperText = {passwordValid}
          />

           

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onsubmit}
          >
            Sign Up 1
          </Button>
      
        </form>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
    </Base>
  );
}


export default SignUp;