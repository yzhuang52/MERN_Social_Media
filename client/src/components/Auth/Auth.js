import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import {GoogleLogin} from "@react-oauth/google";
import Input from './Input';
import jwt_decode from 'jwt-decode';
import useStyles from './styles';
import {useDispatch} from "react-redux";
import Icon from  './icon';
import {AUTH} from '../../constants/actionTypes';
import {signup, signin} from '../../actions/auth';

function Auth(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initState);
    const [showPassWord, setShowPassWord] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData, navigate));
        }else{

        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleShowPassword = () => {
        setShowPassWord((prev) => !prev);
    }
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        handleShowPassword(false)
    }
    const GoogleSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        const result = {'email': decoded.email, 'familyName': decoded.family_name, 'givenName': decoded.given_name, 'name': decoded.name, 'imageUrl': decoded.picture}
        const token = {'token': res.credential};
        try{
            dispatch({type: AUTH, data: {result, token}})
            navigate('/');
        } catch(error) {

        }
    }
    const GoogleFailure = (error) => {
        console.log(error);
        console.log("Signin Failure")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon className={classes.lock}/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="first Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="last Name" handleChange={handleChange} half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassWord ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignup ? 'Sign up' : 'Sign in'}
                        </Button>
                        <GoogleLogin
                            theme="filled_blue"
                            width="375"
                            onSuccess={GoogleSuccess}
                            onFailure={GoogleFailure}

                        />
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have an account? SIGN IN' : 'Don\'t have an account? SIGN UP' }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;