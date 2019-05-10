import {connect} from 'react-redux';
import _ from '@lodash';
import history from 'history.js';
import { FuseAnimate } from '@fuse';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { darken } from '@material-ui/core/styles/colorManipulator';
import {
  withStyles,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';

import { SET_USER_DATA } from '../../../../auth/store/actions'
import { setUserData } from '../../../../auth/store/actions/user.actions'
import * as jwt_decode from "jwt-decode";


const styles = theme => ({
  root: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      darken(theme.palette.primary.dark, 0.5) +
      ' 100%)',
    color: theme.palette.primary.contrastText
  }
});

const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');

class Register2Page extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false
  };

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      )
    );
  };

  handleClick = (event, dispatch) => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
      )
    );

    fetch(api_host + '/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        localStorage.setItem('token', data);        

        var decoded = jwt_decode(data);

        const user = {
          role: 'guest',
          data: {
            displayName: decoded.user.username,
            photoURL: decoded.user.pic,
            shortcuts: [
              'calendar',
              'mail',
              'contacts',
              'todo'
            ]
          }
        };

        this.props.setUserData(user);

        history.push({
          pathname: '/team'
        });

      });
    });
  };

  canBeSubmitted() {
    const { username, password, passwordConfirm, acceptTermsConditions } = this.state;
    return (
      username.length > 0 &&
      password.length > 0 &&
      password.length > 3 &&
      password === passwordConfirm &&
      acceptTermsConditions
    );
  }

  render() {
    const { classes } = this.props;
    const { username, email, password, passwordConfirm, acceptTermsConditions } = this.state;


    return (
      <div className={classNames(classes.root, 'flex flex-col flex-auto flex-no-shrink p-24 md:flex-row md:p-0')}>
        <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
          <FuseAnimate animation="transition.expandIn">
            <img className="w-128 mb-32" src="assets/images/logos/CampusHeadBetaLogo.png" alt="logo" />
          </FuseAnimate>

          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Typography variant="h3" color="inherit" className="font-light">
              Welcome to the CampusHead!
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={400}>
            <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit
              fermentum pellentesque. Sed mollis velit facilisis facilisis.
            </Typography>
          </FuseAnimate>
        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>
          <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <Typography variant="h6" className="md:w-full mb-32">
                CREATE AN ACCOUNT
              </Typography>

              <form name="registerForm" noValidate className="flex flex-col justify-center w-full" >

                <TextField
                  className="mb-16"
                  label="Name"
                  autoFocus
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <TextField
                  className="mb-16"
                  label="Password (Confirm)"
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />

                <FormControl className="items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTermsConditions"
                        checked={acceptTermsConditions}
                        onChange={this.handleChange}
                      />
                    }
                    label="I read and accept terms and conditions"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16"
                  aria-label="Register"
                  disabled={!this.canBeSubmitted()}
                  onClick = {this.handleClick}
                >
                  CREATE AN ACCOUNT
                </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Already have an account?</span>
                <Link className="font-medium" to="/team">
                  Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserData: user => {
    dispatch(setUserData(user))
  }
})

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Register2Page));
// export default (FuseDialog);
