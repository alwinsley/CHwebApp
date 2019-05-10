import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { withStyles, Card, Button, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate, FuseAnimateGroup } from '@fuse';
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

const styles = theme => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  }
});

class ActivityPage extends Component {
  state = {
    lyrics: '',
    song_id: 0,
  };

  readSongDetail(id){
    this.setState({ 
      lyrics: '',
    });

    //-----read song detail-----
    fetch(api_host + '/song/getByID/'  + id , {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        if(data.length != 0){ 
          this.setState({
            lyrics: data[0].lyrics,
          });
        }
      });
    });
  }

  componentDidMount(){
    const { sid } = this.props.match.params
    this.setState({ song_id: sid});
    
    if(token != null && token != ""){
      decoded = jwt_decode(token);
      this.readSongDetail(sid);
    }else{
      history.push('/login');
    }      
  }

  render() {
    const {lyrics} = this.state;
    const lyrics_array = lyrics.split('\n');
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
                  Song Lyrics : Look into my eyes
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 flex flex-col items-center justify-center w-full">
            <Button to={`/songs`} component={Link} className="justify-start px-32" color="secondary">
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
                    <p>{lyrics}</p>
                    <p>
                    {lyrics_array &&
                      lyrics_array.map(lyric => (
                        <span>{lyric}
                        <br />
                        </span> 
                    ))}
                    </p>
                    {/* <p>
                      Look into my eyes - you will see
                      <br />
                      What you mean to me
                      <br />
                      Search your heart - search your soul
                      <br />
                      And when you find me there you'll search no more
                      <br />
                      <br />
                      Don't tell me it's not worth tryin' for
                      <br />
                      You can't tell me it's not worth dyin' for
                      <br />
                      You know it's true
                      <br />
                      Everything I do - I do it for you
                      <br />
                      <br />
                      Look into your heart - you will find
                      <br />
                      There's nothin' there to hide
                      <br />
                      Take me as I am - take my life
                      <br />I would give it all - I would sacrifice
                      <br />
                      <br />
                      Don't tell me it's not worth fightin' for
                      <br />I can't help it - there's nothin' I want more
                      <br />
                      You know it's true
                      <br />
                      Everything I do - I do it for you
                      <br />
                      <br />
                      There's no love - like your love
                      <br />
                      And no other - could give more love
                      <br />
                      There's nowhere - unless you're there
                      <br />
                      All the time - all the way
                      <br />
                      <br />
                      Oh - you can't tell me it's not worth tryin' for
                      <br />I can't help it - there's nothin' I want more
                      <br />I would fight for you - I'd lie for you
                      <br />
                      Walk the wire for you - ya I'd die for you
                      <br />
                      <br />
                      You know it's true
                      <br />
                      Everything I do - I do it for you
                    </p> */}
                  </Card>
                </FuseAnimateGroup>
              </div>
            </div>
            <Button to={`/songs`} component={Link} className="justify-start px-32" color="secondary">
              Back
            </Button>
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ActivityPage);
