import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import Form from "../Form/Form";
function Auth(props) {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassWord, setShowPassWord] = useState(false);
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const handleShowPassword = () => {
        setShowPassWord((prev) => !prev);
    }
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        handleShowPassword(false)
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
                                    <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half/>
                                    <Input name="firstName" label="firstName" handleChange={handleChange} half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassWord ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignup ? 'Sign up' : 'Sign in'}
                        </Button>
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