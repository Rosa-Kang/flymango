import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
 const [form, setForm] = useState(initialState);
 const [isSignup, setIsSignup] = useState(false);
 const dispatch = useDispatch();
 const history = useHistory(); 
 const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit =(e)=> {
      e.preventDefault();

      if (isSignup) {
        dispatch(signup(form, history))
      } else {
        dispatch(signin(form, history))     
      }
 }

 const handleChange=(e)=> {
   setForm({...form,[e.target.name]: e.target.value});
 }
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
   try {
     dispatch({type: 'AUTH', data:{result, token}});

     history.push('/');
   } catch (error) {
     console.log(error);
   }
  
  }

  const googleFailure =( error ) => {
   console.log("Google Sign In was unsuccessful. Try Again Later")
   console.log(error);
  }

 const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

 
 return (
    <Container component="main" maxWidth="xs">
      <Paper id="paper" className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {  isSignup && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange}  half/>
                <Input name="lastName" label="Last Name" handleChange={handleChange}  half/>
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type = "email" />
              <Input name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} type = {showPassword ? "text" : "password"} />
            {isSignup && <Input name="confirmPassword" label ="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
           clientId="458803164569-4vt2k6v4u0gp2sm5vb8djggupr50r33r.apps.googleusercontent.com"
           render={(renderProps)=> (
             <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
               Google Sign In
             </Button>
           )}
           onSuccess = {googleSuccess}
           onFailure = {googleFailure}
           cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
                <Button onClick={switchMode} >
                  { isSignup ? 'Already have an account?  Sign In' : "Don't have an account?  Sign up" }
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
