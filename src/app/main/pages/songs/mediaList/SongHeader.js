import React, { Component } from 'react';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { withRouter } from 'react-router-dom';
import { Paper, Input, Icon, Typography, MuiThemeProvider, Button } from '@material-ui/core';

import superagent from 'superagent';
import {SongMediaList} from './SongList';

import { FileInput, SVGIcon } from 'react-md';
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

class SongHeader extends Component {
    state = {
        selectedFile: null,
    };

    uploadMedia = (e) => {
        console.log(e.target)
    };
  
    fileSelectHandler = (event) => {
      // this.setState({ selectedFile: event.target.files[0] });
      var selectedFile = event.target.files[0];
      var path = 'public/uploads/media/' + selectedFile.name;
      const {sid} = this.props.match.params;

      const data = {
          'file': selectedFile,
          'name': selectedFile.name,
          'path': path,
          'sid' : sid,
      }

      let uploadRequest = superagent.post(api_host + '/media')
      .set('authorization', 'Bearer ' + token)
      .field(data);
      
      uploadRequest.attach('image', selectedFile);
      uploadRequest.end((err, res) => {
        if (err) {
          alert(res.body.message);
          return;
        }    
        console.log(res);
        window.location.reload();
        // this.props.readMedia(sid);
      });
    };

    render(){
        return (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex items-center">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="hidden sm:flex" variant="h6">
                    LIST OF SONG MEDIA {}
                  </Typography>
                </FuseAnimate>
              </div>
        
              <div className="flex flex-1 items-center justify-center px-12">
                <MuiThemeProvider theme={this.props.mainTheme}>
                  <FuseAnimate animation="transition.slideDownIn" delay={300}>
                    <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
                      <Icon className="mr-8" color="action">
                        search
                      </Icon>
        
                      <Input
                        placeholder="Search"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={this.props.searchText}
                        inputProps={{
                          'aria-label': 'Search'
                        }}
                        onChange={this.props.setSearchText}
                      />
                    </Paper>
        
                  </FuseAnimate>
                </MuiThemeProvider>
              </div>
              
              {/* <Input id="my-input" aria-describedby="my-helper-text" type="file" style={{display: 'none'}}
                onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput}/>
              <Button onClick={()=> this.fileInput.click()} variant="contained" color="secondary" aria-label="Follow">
                Pick File
              </Button> */}
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.fileSelectHandler}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" onClick={this.uploadMedia} color="secondary" aria-label="Follow">
                        Upload New Media
                    </Button>
                </label>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setSearchText: Actions.setProductsSearchText
        },
        dispatch
    );
}
  
function mapStateToProps({ eCommerceApp, fuse, ownProps }) {
    return {
        searchText: eCommerceApp.products.searchText,
        mainTheme: fuse.settings.mainTheme,
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SongHeader)
);