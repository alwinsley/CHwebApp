import _ from '@lodash';
import React, { Component } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import SongTable from './SongTable';
import SongHeader from './SongHeader';
import reducer from '../store/reducers';
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


class SongMediaList extends Component {
    state = {
        song_id: 0,
        media: [],
        song_name: ''
    };

    readMedia(id){       
        const media = [];     

        fetch(api_host + '/song/getMediaByID/'  + id , {
            method: 'GET',
            headers: headers,
        })
        .then(response => {
            response.json().then(data => {
                console.log(data);
                if(data.data.length != 0){
                    data.data.forEach(singleMedia => {
                      media.push({
                        id: singleMedia.id,
                        name: singleMedia.name,
                        description: singleMedia.description,
                      });
                    });
                    this.setState({
                        media: media,
                    });
                }
                console.log(this.state);
            });
        });
    }

    readSong(id){
        this.setState({ 
            song_name: '',
        });
    
        fetch(api_host + '/song/getByID/'  + id , {
          method: 'GET',
          headers: headers,
        })
        .then(response => {
          response.json().then(data => {
            console.log(data);
            if(data.length >0){
              this.setState({
                  song_name: data[0].name,
              });
            }
          });
        });
    }

    componentDidMount(){
        const { sid } = this.props.match.params;
        this.setState({ song_id: sid });
        
        if(token != null && token != ""){
          decoded = jwt_decode(token);
          this.readMedia(sid);
          this.readSong(sid);
        }else{
          history.push('/login');
        }
    }

    render(){
        const { media, song_name } = this.state;
        console.log(this.state);
 
        return(
            <FusePageCarded
            classes={{
              content: 'flex',
              header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
              toolbar: 'px-16 sm:px-24'
            }}
            header={<SongHeader readMedia={this.readMedia}/>}            
            content={<SongTable media={media}/>}
            innerScroll
            />
        );
    }
}

export default withReducer('eCommerceApp', reducer)(SongMediaList);