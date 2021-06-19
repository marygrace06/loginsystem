import React from 'react';
import { Button, Card } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { withRouter } from "react-router-dom";
function Home(props) {
    const handleLogout = (e) => {
        e.preventDefault();
        alert('back to login')
        localStorage.setItem('currentUser', '')
        redirectToLogin();
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    return (
        <div className="mt-2">

            <Card title="MG CRUZAT Home" style={{ backgroundColor: "#F8F8FF" }}>
                Home page content
                <div>
                    <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleLogout}
                        icon={<LogoutOutlined />}
                    >
                        Logout
                  </Button>
                </div>
            </Card>
        </div>

    )
}

export default withRouter(Home);