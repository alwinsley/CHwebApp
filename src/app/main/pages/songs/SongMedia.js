import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { FuseAnimateGroup } from '@fuse';
import { Card, Typography, Button } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import * as jwt_decode from "jwt-decode";
import history from 'history.js';


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


class SongMedia extends Component {
  state = {
    path: '',
    song_id: 0,
    media_id: 0,
    song_name: '',
  };

  readMediaDetail(mid) {
    fetch(api_host + '/media/getByID/' + mid, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
          if (data.length != 0) {
            this.setState({
              path: data.data[0].path,
            });
          }
          console.log(this.state);
        });
      });
  }

  readSong(id) {
    this.setState({
      song_name: '',
    });

    fetch(api_host + '/song/getByID/' + id, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
          if (data.length > 0) {
            this.setState({
              song_name: data[0].name,
            });
          }
        });
      });
  }

  componentDidMount() {
    const { sid, mid } = this.props.match.params;
    this.setState({ song_id: sid, media_id: mid });

    if (token != null && token != "") {
      decoded = jwt_decode(token);
      this.readMediaDetail(mid);
      this.readSong(sid);
    } else {
      history.push('/login');
    }
  }

  render() {
    const { path, song_name } = this.state;
    return (
      <FusePageSimple
        classes={{
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          toolbar: 'px-16 sm:px-24'
        }}
        header={
          <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Song Media : {song_name}
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 flex flex-col items-center justify-center w-full">
            <Button to={`/songs/details/` + this.state.song_id} component={Link} className="justify-start px-32" color="secondary">
              Back
            </Button>
            <div className="flex p-24 w-full max-w-2xl mx-auto">
              <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                  enter={{
                    animation: 'transition.slideUpBigIn'
                  }}
                >
                  <Card className="w-full p-24 overflow-hidden">
                    <div className="border-1">
                      <img
                        className="w-full border-b-1"
                        src={api_host + '/' + path}
                        alt="media"
                      />
                    </div>
                  </Card>
                </FuseAnimateGroup>
              </div>
            </div>
            <Button to={`/songs/details/` + this.state.song_id} component={Link} className="justify-start px-32" color="secondary">
              Back
            </Button>
          </div>
        }
      />
    );
  }
}

export default SongMedia;
