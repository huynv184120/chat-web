import { useState } from 'react';
import React from 'react';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CodeIcon from '@material-ui/icons/Code';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { authApi } from '../../api';

const useStyles = makeStyles(() => ({
    authen: {
        display: "flex",
        flexDirection: "column",
        background: "rgba(204, 193, 227, 0.6)",
        width: "320px",
        border: "solid",
        borderRadius: "30px",
        position: "absolute",
        top: "15%",
        right: "15vw",
        "min-height": "450px",
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        marginTop: "30px",
        "& .MuiInputBase-root": {
            marginTop: "30px",
        },
        "& .MuiButton-root": {
            margin: "auto",
            marginTop: "30px",
            marginBottom: "10px",
            width: "50px",

        }
    },
    signup: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        marginTop: "30px",
        "& .MuiInputBase-root": {
            marginTop: "30px",
        },
        "& .MuiButton-root": {
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px",
            width: "200px",

        }
    },
    verify:  {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        marginTop: "30px",
        "& .MuiInputBase-root": {
            marginTop: "30px",
        },
        "& .MuiButton-root": {
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px",
            width: "100px",

        }
    }





}))

const Auth = () => {


    const [login, setLogin] = useState(true)
    const [signup, setSignup] = useState(false)
    const [verify, setVerify] = useState(false)

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        showPassword: true,
        annouce:""
    })

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        username: '',
        showPassword: true,
        confirmPassword:true,
        annouce:""
    })

    const [verifyForm, setVerifyForm] = useState({
        email:'',
        code:''
    })

    const classes = useStyles();


    const loginHandle = async () => {
        const res = await authApi.login({email:loginForm.email, password: loginForm.password});
        console.log(res.message)
        if(res.message === "success"){
            window.location.reload();
        }else{
            setLoginForm({...loginForm,annouce:res.message});
        }
    }

    const signupHandle = async () => {
        const res = await authApi.signup({email:signupForm.email, username:signupForm.username, password:signupForm.password});
        if(res.message === "success"){
            window.location.reload();
        }else{
            setSignupForm({...signupForm, annouce:res.message});
        }
    }

    // const verifyHandle = () => {
    //     console.log(verifyForm)
    // }


    return (
        <div style={{backgroundImage:"url(https://i.pinimg.com/564x/8d/12/8d/8d128d89ab8baf0c70defe825281825f.jpg)",backgroundSize:"100vw 105vh", width:"100vw", height:"100vh"}}>
            <div className={classes.authen}>
                {login &&
                    <form autoComplete='off'>
                        <div className={classes.loginForm} onKeyDown={(e) => { if (e.key == 'Enter') loginHandle(); }}>
                            <h1>Login</h1>
                            <p style={{color:"red"}}>{loginForm.annouce}</p>
                            <TextField
                                required
                                id="input-with-icon-textfield"
                                type="email"
                                placeholder='email'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e)=>setLoginForm({...loginForm,email:e.target.value})}
                            />
                            <TextField
                                required
                                placeholder='password'
                                type={loginForm.showPassword ? "password" : "text"}
                                error={false}
                                id="input-with-icon-textfield"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end" onClick={() => setLoginForm(pre => ({ ...pre, showPassword: !pre.showPassword }))}>
                                            {loginForm.showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e)=>setLoginForm({...loginForm, password:e.target.value})}

                            />
                            <Button variant="contained" color="primary" href="#contained-buttons" onClick={loginHandle}>
                                login
                            </Button>

                            <p>
                                <a onClick={() => { setLogin(false); setSignup(true) }} style={{cursor:"pointer"}}>
                                    <u>sign up</u>
                                </a>
                                {/* <label> or </label>
                                <a onClick={() => { setLogin(false); setVerify(true) }}>
                                    verify
                                </a> */}
                            </p>
                        </div>
                    </form>}

                {signup &&
                    <form autoComplete='off'>
                        <div className={classes.signup}>
                            <h1>Create Account</h1>
                            <p style={{color:"red"}}>{signupForm.annouce}</p>
                            <TextField
                                required
                                id="input-with-icon-textfield"
                                type="text"
                                placeholder='username'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e)=>setSignupForm({...signupForm, username:e.target.value})}
                            />

                            <TextField
                                required
                                id="input-with-icon-textfield"
                                type="email"
                                placeholder='email'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e)=>setSignupForm({...signupForm, email:e.target.value})}
                            />
                            <TextField
                                required
                                placeholder='password'
                                type={loginForm.showPassword ? "password" : "text"}
                                error={false}
                                id="input-with-icon-textfield"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end" onClick={() => setLoginForm(pre => ({ ...pre, showPassword: !pre.showPassword }))}>
                                            {loginForm.showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                                        </InputAdornment>
                                    ),
                                }}

                                onChange={(e)=>setSignupForm({...signupForm, password:e.target.value})}

                            />
                            <TextField
                                required
                                placeholder='confirm password'
                                type={loginForm.showPassword ? "password" : "text"}
                                error={!signupForm.confirmPassword}
                                helperText={signupForm.confirmPassword ? "" : "incorrect"}
                                id="input-with-icon-textfield"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end" onClick={() => setLoginForm(pre => ({ ...pre, showPassword: !pre.showPassword }))}>
                                            {loginForm.showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                                        </InputAdornment>
                                    ),
                                }}
                                onBlur={(e)=>{if (signupForm.password!=e.target.value)
                                                    setSignupForm({...signupForm, confirmPassword:false})
                                                    else setSignupForm({...signupForm, confirmPassword:true})                                                
                                                }}
                                
                            />
                            <Button variant="contained" color="primary" href="#contained-buttons" onClick={signupHandle}>
                                submit
                            </Button>

                            <p>
                                <a onClick={() => { setLogin(true); setSignup(false) }} style={{cursor:"pointer"}}>
                                    <u>login</u>
                                </a>
                                {/* <label> or </label>
                                <a onClick={() => { setSignup(false); setVerify(true) }}>
                                    verify
                                </a> */}
                            </p>
                        </div>
                    </form>}

                {/* {verify &&
                    <form autoComplete='off'>
                        <div className={classes.verify}>
                            <h1>Verify account</h1>
                            <TextField
                                required
                                id="input-with-icon-textfield"
                                type="email"
                                placeholder='email'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setVerifyForm({...verifyForm, email:e.target.value})}

                            />
                            <TextField
                                required
                                placeholder='veryfy code'
                                type="text"
                                id="input-with-icon-textfield"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" onClick={() => setLoginForm(pre => ({ ...pre, showPassword: !pre.showPassword }))}>
                                            {<CodeIcon />}
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setVerifyForm({...verifyForm, code:e.target.value})}
                            />
                            <Button variant="contained" color="primary" href="#contained-buttons" onClick={verifyHandle}>
                                confirm
                            </Button>

                            <p>
                                <a onClick={() => { setLogin(true); setVerify(false) }}>
                                    login
                                </a>
                                <label> or </label>
                                <a onClick={() => { setSignup(true); setVerify(false) }}>
                                    sign up
                                </a>
                            </p>
                        </div>
                    </form>} */}
            </div>
        </div>

    )
}

export default Auth;