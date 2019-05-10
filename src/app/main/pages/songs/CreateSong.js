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


class CreateSong extends Component {
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

  createSong = model => {
    console.log(model);
    // window.location.replace('/activity');
    // this.props.submitLogin(model);
    fetch(api_host + '/song', {
      method: 'POST',
      body: JSON.stringify({        
        name: model.song_name,
        artist: model.artist_name,
        key: model.key,
        tempo: model.tempo,
        link: model.link,
        lyrics: model.lyrics,
        uid: decoded.user.id,
      }),
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        history.push('/songs');
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
                Create Song !
              </Typography>

              <div className="w-full">
                <Formsy
                  onValidSubmit={this.createSong}
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

                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="artist_name"
                    label="Artist Name"
                    variant="outlined"
                    required
                    />

                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="key"
                    label="Key"
                    variant="outlined"
                    required
                    />

                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="tempo"
                    label="Tempo"
                    variant="outlined"
                    required
                    />  

                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="link"
                    label="Youtube Link"
                    variant="outlined"
                    required
                    />

                    <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="lyrics"
                    label="Lyrics"
                    multiline rows={5}
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
                        Create
                    </Button>
                </Formsy>
              </div>

              <div className="flex flex-col items-center justify-center pt-32">
                <Link className="font-medium mt-8" to="/songs">
                  Back to Song List Page
                </Link>
              </div>

            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(CreateSong));
