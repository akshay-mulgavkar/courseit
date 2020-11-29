import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Divider } from 'antd';
import axios from 'axios';
import Config from '../../constants/config';
import * as ROUTES from '../../constants/routes';

const FormItem = Form.Item;
const INITIAL_STATE = {
  email: '',
  password: '',
  errors: ''
};
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }
  onSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    const headers = {
      headers: {'content-type': 'application/json'}
    };
    var self = this;
    axios.post(Config.log_in, {
      email: email,
      password: password
    },headers)
    .then(function (response) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('adminEmail', response.data.data.email);
      window.location.reload();
    }).catch(function (error) {
      self.setState({errors: "Incorrect Email/Password! Please try again"});
    });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  };
  render() {
    const { email, password } = this.state;
    const isInvalid = email === '' || password === '';
    const isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <div className="wrapper">
        <div className="container">
          {isAlreadyAuthenticated ? 
            this.props.history.push(ROUTES.HOME) : 
              (
                <div type="flex" justify="center" align="middle">
                  <Row className="form-login">
                    <Col span={24}>
                      <div className="welcome-administrator-section"><Icon type="insurance" /> <h1 className="welcome-administrator-title">Welcome to Administrator</h1></div>
                      <p className="login-form-text-content">
                      ADMIN LOGIN
                      </p>
                      <Divider />
                    </Col>
                    <Col span={24}>
                      <Form method="post"  name="userLoginForm" onSubmit={this.onSubmit} className="login-form" type="flex" justify="center" align="middle">
                        <div className="errorMsg">{this.state.errors}</div>
                        <FormItem label="Email">
                          <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your Email" name="email" value={this.state.email} onChange={this.onChange}/>
                        </FormItem>
                        <FormItem label="Password">
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="**********" name="password" value={this.state.password} onChange={this.onChange}/>
                        </FormItem>
                        <FormItem>
                          <Button type="primary" htmlType="submit" className="login-form-button" disabled={isInvalid}>
                            Sign In
                          </Button>
                        </FormItem>
                      </Form>
                    </Col>
                  </Row>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}
export default SignIn;