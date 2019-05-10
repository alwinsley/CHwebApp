import React, { useState, useEffect } from "react";
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import TeamMemberHeader from './TeamMemberHeader';
import TeamMemberTable from './TeamMemberTable';
import reducer from './store/reducers';
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


const TeamMemberList = () => {
  const [initialized, setInitialized] = useState(false);
  const [team_member, setteam_member] = useState([]);
  const [team_name, setteam_name] = useState("");

  var decoded = jwt_decode(token);

  useEffect(() => {
    if (!initialized) {
      fetch(api_host + '/user/'+decoded.user.id+'/getTeam', {
        method: 'GET',
        headers: headers
      })
      .then(response => {    
    
        response.json().then(data => {
          console.log(data.teamInfo);
    
          if(data.teamInfo.length > 0){
            fetch(api_host + '/team/getById/'+data.teamInfo[0].team_id, {
              method: 'GET',
              headers: headers
            }).then(response => {
    
              response.json().then(data => {
                console.log(data);
                // team_member = data.members;
                setteam_member(data.members);
                setteam_name(data.teamInfo[0].name)
              })
            });
          }
        })
      });
    }
  }, []);


  
  console.log(team_member);
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        toolbar: 'px-16 sm:px-24'
      }}
      header={<TeamMemberHeader team_name={team_name}/>}
      content={<TeamMemberTable team_member={team_member}/>}
      innerScroll
    />
  );
};

export default withReducer('eCommerceApp', reducer)(TeamMemberList);
