import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import { Button, InputAdornment, Icon } from '@material-ui/core';
import history from 'history.js';


const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');

class JWTLoginTab extends Component {
  state = {
    canSubmit: false,
  };

  form = React.createRef();

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onSubmit = model => {
    console.log(model.username);
    // window.location.replace('/activity');
    // this.props.submitLogin(model);

    fetch(api_host + '/login', {
      method: 'POST',
      body: JSON.stringify({
        username: model.username,
        password: model.password
      }),
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        localStorage.setItem('token', data)

        history.push({
          pathname: '/team'
        });

      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.error && (this.props.login.error.email || this.props.login.error.password)) {
      this.form.updateInputsWithError({
        ...this.props.login.error
      });

      this.props.login.error = null;
      this.disableButton();
    }

    return null;
  }

  render() {

    const { username, password } = this.state;

    return (
      <div className="w-full">
        <Formsy
          onValidSubmit={this.onSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref={form => (this.form = form)}
          className="flex flex-col justify-center w-full"
        >
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="username"
            label="Username/Email"
            validations={{
              minLength: 4
            }}
            validationErrors={{
              minLength: 'Min character length is 4'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    email
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <TextFieldFormsy
            className="mb-16"
            type="password"
            name="password"
            label="Password"
            validations={{
              minLength: 4
            }}
            validationErrors={{
              minLength: 'Min character length is 4'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    vpn_key
                  </Icon>
                </InputAdornment>
              )
            }}
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16 normal-case"
            aria-label="LOG IN"
            // disabled={!canSubmit}
            value="legacy"
          >
            Login
          </Button>
        </Formsy>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: authActions.submitLogin
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JWTLoginTab)
);
