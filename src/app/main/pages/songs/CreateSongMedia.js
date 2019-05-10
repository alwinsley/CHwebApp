import { FuseAnimate, TextFieldFormsy } from '@fuse';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { withStyles, Card, CardContent, Typography, Tabs, Tab, Button, InputAdornment, Icon } from '@material-ui/core';

import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import history from 'history.js';

import * as jwt_decode from "jwt-decode";


//----------get user data----------
var token = localStorage.getItem('token');
var decoded = [];

//----------Api config ---------
const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');
headers.append('authorization', 'Bearer ' + token);

var photoURL = "";
var username = "";

var user = [];

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


class CreateSongMedia extends Component {
  state = {
    show: false,
    user: user,    
  };

  componentDidMount(){
    if(token != null && token != ""){
      decoded = jwt_decode(token);
        
      username = decoded.user.username;

      if(decoded.user.pic != null){
          photoURL = decoded.user.pic;
      }
      var user = { 'role': 'guest',
        'data': {
          'username': username,
          'photoURL': photoURL
        }
      } 
    }else{
      history.push('/login');
    }
  }

  createSongMedia = model => {
    const { sid } = this.props.match.params;
    console.log(model);
    fetch(api_host + '/song', {
      method: 'POST',
      body: JSON.stringify({        
        name: model.song_name,
        path: model.artist_name,
        song_id: sid,
      }),
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data); 
        history.push('list');
      })
    });
  };


  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className={classNames(classes.root, 'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0')}>
        <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
          <FuseAnimate animation="transition.expandIn">
            <img className="w-128 mb-32" src="assets/images/logos/CampusHeadBetaLogo.png" alt="logo" />
          </FuseAnimate>

        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>
          <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <Typography variant="h6" className="text-center md:w-full mb-48">
                Upload New Media !
              </Typography>

              <div className="w-full">
                <Formsy
                  onValidSubmit={this.createSongMedia}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref={form => (this.form = form)}
                  className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="song_name"
                    label="Name of Song"
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
                      Upload
                    </Button>
                </Formsy>
              </div>

              <div className="flex flex-col items-center justify-center pt-32">
                <Link className="font-medium mt-8" to="/songs">
                  Back to Song Media List Page
                </Link>
              </div>

            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(CreateSongMedia));
