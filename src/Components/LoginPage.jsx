import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import './loginRegister.css'

class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            token: '',
            responseStatus: 0,
            response: {}
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);

    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    login(event) {

        event.preventDefault();
        var url = 'http://localhost:8080/authenticate';
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                this.setState({ responseStatus: response.status });
                this.setState({ redirectToReferrer: true});
                return response.json()
            } else {
                throw new Error('Error with login');
            }
        })
            .then(data => {
                this.setState({ token: data.token });
                localStorage.setItem('token', data.token);
                console.log(data);
            }
            )
            .catch((error) => {
                console.log(error)
            });
    }



    render() {
        if (this.state.token !== undefined && this.state.token.length !== 0) {
            console.log("redirect")
            return <Redirect to='/ProjectsList' />;
        }
        return (
            <div>
                <div>
                    <div className="row m-0">
                        <div className="col p-0">
                            <header className="m-0 navbar bg-success">
                                <h2 className="m-0 p-2 navbar-brand"><b className="text-light">task<span className="main-color">Manager</span></b></h2>
                            </header>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-sm">
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                    <section className="login-block">
                        <div className="container bg-warning p-5">
                            <div class="wrapper fadeInDown">
                                <div id="formContent">

                                    <div class="fadeIn first">
                                        <h1>LOGIN</h1>
                                    </div>

                                    <div className="form-group">
                                        <label className="text-uppercase">Username</label>
                                        <input type="text" value={this.state.username} className="form-control" onChange={this.handleUsername} />
                                        <label className="text-uppercase">Password</label>
                                        <input type="password" value={this.state.password} className="form-control" onChange={this.handlePassword} />
                                        <input type="submit" value="Sign In" className="btn btn-primary btn-login float-right" onClick={this.login} />
                                    </div>

                                    <div id="formFooter">
                                        <a class="underlineHover" href="#">Forgot Password?</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default LoginPage;