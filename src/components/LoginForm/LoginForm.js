import React, { useState } from 'react';
import './LoginForm.css';
import { withRouter } from "react-router-dom";
import { Button, Input, Card } from 'antd';
import { LoginOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        let accounts = []
        accounts = JSON.parse(localStorage.getItem('accounts'))
        console.log(accounts)

        let emails = accounts.map(rec => {
            console.log(rec)
            return rec.email
        })
        console.log('emails', emails)
        if (state.email && state.password) {
            if (emails.includes(state.email)) {
                let password = accounts.filter(rec => {
                    return rec.email === state.email
                })[0].password
                console.log(password)
                if (state.password === password) {
                    alert('successs')
                    localStorage.setItem('currentUser', state.email)
                    redirectToHome();
                } else {
                    alert('wrong password')
                }
            } else {
                alert('email not yet Register')
            }
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <Card title="Login" style={{ width: 300, backgroundColor: "#F8F8FF" }}>

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
                        <div className="form-check">
                        </div>

                        <small id="emailHelp" className="form-text text-muted">...</small>
                        <div className="form-group text-left">
                            <Button
                                type="submit"
                                className="btn btn-primary ma-5"
                                onClick={handleSubmitClick}
                                icon={<LoginOutlined />}
                            >Submit
                        </Button>
                        </div>
                    </center>
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="registerMessage">
                        <span>Dont have an account? </span>
                        <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
                    </div>
                </Card>
            </form>
        </div>
    )
}

export default withRouter(LoginForm);