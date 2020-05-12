import React, { Component } from 'react';
import { login } from './linking.com';

class Login extends Component {
  
    constructor(){
        super()

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
        
    }

    handleSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password : this.state.password
        };

        login(user).then(res=>{
            if(res){
                this.props.history.push('/profile');
            }
        })
    }
  
    render(){
        return (
            <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.handleSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default Login;
