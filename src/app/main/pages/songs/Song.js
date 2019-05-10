import React, { Component } from 'react';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import { withStyles, IconButton, Button, Card, CardContent, ListItemText, Paper, Input, AppBar, Icon, Typography, Divider, List, ListItem, Avatar, CardHeader,  } from '@material-ui/core';

import YouTube from 'react-youtube';

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

var posts = [];
var comments = [];

const styles = theme => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  },
  textStyle: {
    lineHeight: 3
  },
  btnStyle: {
    float: 'right',
    padding: 10,
    margin: 5
  }
});

class ActivityPage extends Component {
  state = {
    name: '',
    artist: '',
    media: '',
    posts: [],
    song_id: 0,
    content: '',
  };

  readSongDetail(id){
    this.setState({ 
      name: '',
      artist: '',
      songkey: '',
      tempo: '',
      link: '',
      posts: [],
      content: '',   
    });

    var name = '';
    var artist = '';
    var songkey = '';
    var tempo = '';
    var link = '';
    posts = [];
    comments = [];

    //-----read song detail-----
    fetch(api_host + '/song/getByID/'  + id , {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        if(data.length != 0){ 
          name= data[0].name;
          artist = data[0].artist;
          songkey = data[0].songkey;
          tempo = data[0].tempo;
          link = data[0].link;
        }
      });
    });

    //-----read posts/comments------    
    fetch(api_host + '/song/getPostByID/'  + id, {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        if(data.length != 0){ 
          data.data.forEach(post => {
            if(data.comment.length != 0){ 
              data.comment.forEach(comment => {                
                if(comment.pid == post.id){
                  console.log(comment.pid, post.id);
                  comments.push(
                    {
                      id: comment.id,
                      user: {
                        name: comment.username,
                        avatar: comment.pic,
                      },
                      time: comment.created_date,
                      message: comment.content,                  
                    }
                  );
                }
              });              
            }

            posts.push({
              id: post.id,
              user: {
                name: post.username,
                avatar: post.pic,
              },
              message: post.content,
              time: post.created_date,
              type: 'post',
              // like: 5,
              // share: 21,
              // media: {
              //   type: 'image',
              //   preview: 'assets/images/profile/morain-lake.jpg'
              // },
              comments: comments                
            });
            comments = [];
          });
          this.setState({
            posts: posts,
            name: name,
            artist: artist,
            songkey: songkey,
            tempo: tempo,
            link: link,
          });
          console.log(this.state);
        }
      });
    });
  }

  componentDidMount(){
    const { id } = this.props.match.params
    this.setState({ song_id: id});
    
    if(token != null && token != ""){
      decoded = jwt_decode(token);
      this.readSongDetail(id);
    }else{
      history.push('/login');
    }      
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  //--------post part---------
  async createSongPost(event){
    console.log(this.state.content);
    await fetch(api_host + '/song/post', {
      method: 'POST',
      body: JSON.stringify({
        title: '',
        content: this.state.content,
        created_by: decoded.user.id,
        song_id: this.state.song_id
      }),
      headers: headers
    })
    .then(response => {
      alert("Posted Successful");
    }); 
    
    this.readSongDetail(this.state.song_id);
  }

  handleChangePost = event => {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name] : event.target.value
    });
    console.log(this.state);
  };

  //--------------comment part-----------
  handleChangeComment = event => {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name] : event.target.value
    });
    console.log(this.state);
  };

  async createSongComment(event, pid, type){
    var key = 'key' + pid;
    const state = this.state;

    await fetch(api_host + '/comment', {
      method: 'POST',
      body: JSON.stringify({
        pid: pid,
        type: type,
        content: state[key],
        created_by: decoded.user.id,
      }),
      headers: headers
    })
    .then(response => {
      alert("Posted Successful");
    }); 
    
    this.readSongDetail(this.state.song_id);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const { classes } = this.props;
    const { name, artist, songkey, tempo, link, posts, song_id, content } = this.state;
    var video_id = '';
    if(link != '' && link != null){
      if(link.includes("watch")){
        video_id = link.split('watch?v=')[1];
      }else{
        video_id = link.split('youtu.be/')[1];
      }
    }

    const opts = {
      // height: '390',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
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
                  {name}  <span>({artist}) </span>
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 flex flex-col w-full max-w-512 mx-auto justify-center">
            <Button to={`/songs`} component={Link} className="justify-start px-32 justify-center" color="secondary">
              Back
            </Button>
            <Typography className={classes.textStyle} variant="h6" color="inherit">
              {songkey}: {tempo}
              <Button className={classes.btnStyle} variant="contained" color="primary" size="small" aria-label="post">
                <Icon>edit</Icon>
              </Button>
              <Button
                onClick={() => this.props.history.push('/songs/' + song_id + '/media/list')}
                className={classes.btnStyle}
                variant="contained"
                color="primary"
                size="small"
                aria-label="post"
              >
                Media
              </Button>
              <Button
                onClick={() => this.props.history.push('/songs/' + song_id + '/lyrics/')}
                className={classes.btnStyle}
                variant="contained"
                color="primary"
                size="small"
                aria-label="post"
              >
                Lyrics
              </Button>
            </Typography>
            <YouTube
              videoId={video_id}
              opts={opts}
              onReady={this._onReady}
            />
            {/* <img className="w-full border-b-1" src={link} alt="article" /> */}
            <Card className="w-full overflow-hidden">
              <Input
                className="p-16 w-full"
                classes={{ root: 'text-14' }}
                placeholder="Write something.."
                multiline
                rows="6"
                margin="none"
                disableUnderline
                onChange= {this.handleChangePost}
                value={content}
                name = "content"
              />
              <AppBar className="card-footer flex flex-row border-t-1" position="static" color="default" elevation={0}>
                <div className="p-8">
                  <Button variant="contained" color="primary" size="small" aria-label="post" onClick={(e) => this.createSongPost(e, song_id)}>
                    POST
                  </Button>
                  <Button to={`/songs`} component={Link} className="justify-start px-32" color="secondary">
                    Back
                  </Button>
                </div>
              </AppBar>
            </Card>
            
            <Divider className="my-32" />

            {posts &&
              posts.map(post => (
                <Card className="mb-32 overflow-hidden" key={post.id}>
                  <CardHeader
                    avatar={<Avatar aria-label="Recipe" src={post.user.avatar} />}
                    action={
                      <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                      </IconButton>
                    }
                    title={
                      <span>
                        <Typography className="inline font-medium mr-4" color="primary" paragraph={false}>
                          {post.user.name}
                        </Typography>
                        {post.type === 'post' && 'posted on your timeline'}
                        {post.type === 'something' && 'shared something with you'}
                        {post.type === 'video' && 'shared a video with you'}
                        {post.type === 'article' && 'shared an article with you'}
                      </span>
                    }
                    subheader={post.time}
                  />

                  <CardContent className="py-0">
                    {post.message && (
                      <Typography component="p" className="mb-16">
                        {post.message}
                      </Typography>
                    )}

                    {/* {post.media && <img src={post.media.preview} alt="post" />} */}
                  </CardContent>

                  {/* <CardActions className="" disableActionSpacing>
                    <Button size="small" aria-label="Add to favorites">
                      <Icon className="text-16 mr-8" color="action">
                        favorite
                      </Icon>
                      <Typography className="normal-case">Like</Typography>
                      <Typography className="normal-case ml-4">({post.like})</Typography>
                    </Button>
                    <Button aria-label="Share">
                      <Icon className="text-16 mr-8" color="action">
                        share
                      </Icon>
                      <Typography className="normal-case">Share</Typography>
                      <Typography className="normal-case ml-4">({post.share})</Typography>
                    </Button>
                  </CardActions> */}

                  <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
                    {post.comments && post.comments.length > 0 && (
                      <div className="">
                        <div className="flex items-center">
                          <Typography>{post.comments.length} comments</Typography>
                          <Icon className="text-16 ml-4" color="action">
                            keyboard_arrow_down
                          </Icon>
                        </div>

                        <List>
                          {post.comments.map(comment => (
                            <div key={comment.id}>
                              <ListItem className="px-0">
                                <Avatar alt={comment.user.name} src={comment.user.avatar} />
                                <ListItemText
                                  primary={
                                    <div>
                                      <Typography className="inline font-medium" color="default" paragraph={false}>
                                        {comment.user.name}
                                      </Typography>
                                      <Typography className="inline ml-4" variant="caption">
                                        {comment.time}
                                      </Typography>
                                    </div>
                                  }
                                  secondary={comment.message}
                                />
                              </ListItem>
                              {/* <div className="flex items-center ml-56 mb-8">
                                <Link to="#" className="mr-8">
                                  Reply
                                </Link>
                                <Icon className="text-14 cursor-pointer">flag</Icon>
                              </div> */}
                            </div>
                          ))}
                        </List>
                      </div>
                    )}

                    <div className="flex flex-auto">
                      <Avatar src="assets/images/avatars/profile.jpg" />
                      <div className="flex-1 pl-8">
                        <Paper elevation={0} className="w-full mb-16">
                          <Input
                            className="p-8 w-full border-1"
                            classes={{ root: 'text-13' }}
                            placeholder="Add a comment.."
                            multiline
                            rows="6"
                            margin="none"
                            disableUnderline
                            onChange={this.handleChangeComment}
                            name={'key'+post.id}
                          />
                        </Paper>
                        <Button className="normal-case" variant="contained" color="primary" size="small" onClick={(e) => this.createSongComment(e, post.id, post.type)}>
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </AppBar>
                </Card>
              ))}
          </div>
        }
      />
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ActivityPage));
