import React, { useState } from 'react';
import './RegistrationForm.css';
import { withRouter } from "react-router-dom";
import { Button, Input, Card } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {

        let accounts = []
        accounts = JSON.parse(localStorage.getItem('accounts'))
        console.log('aaa', accounts)
        if (!accounts || !Array.isArray(accounts)) {
            accounts = []
        }

        if (state.email.length && state.password.length) {
            props.showError(null);
            let emails = accounts.map(rec => {
                return rec.email
            })
            console.log('emails', emails)
            if (emails.includes(state.email)) {
                alert('email already in use')
            } else {
                alert('successfully Register')
                accounts.push({ email: state.email, password: state.password })
                console.log(accounts)
                localStorage.setItem('accounts', JSON.stringify(accounts))
                redirectToLogin()
            }
        } else {
            alert('Please enter valid username and password')
        }

    }
    // const redirectToHome = () => {
    //     props.updateTitle('Home')
    //     props.history.push('/home');
    // }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            alert('Passwords do not match')
        }
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>

                <Card title="Register" style={{ width: 300, backgroundColor: "#F8F8FF" }}>
                    <center>
                        <div className="form-group text-left">
                            <Input addonBefore="Email address" type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={state.email}
                                onChange={handleChange}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group text-left">
                            <Input addonBefore="Password" type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </div>
                        <small id="emailHelp" className="form-text text-muted">...</small>
                        <div className="form-group text-left">
                            <Input addonBefore="Confirm Password" type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={state.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <small id="emailHelp" className="form-text text-muted">...</small>

                        <div className="form-group text-left">
                            <Button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmitClick}
                                icon={<LogoutOutlined />}
                            >
                                Register
                        </Button>
                        </div>
                    </center>
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
                    </div>
                </Card>
            </form>

        </div>
    )
}

export default withRouter(RegistrationForm);