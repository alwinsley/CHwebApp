import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import history from 'history.js';


export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

//----------get user data----------
var token = localStorage.getItem('token');
if(token != null && token != ""){
    var decoded = jwt_decode(token);
}else{
history.push('/login');
}

//----------Api config ---------
const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');
headers.append('authorization', 'Bearer ' + token);



export function getEvents()
{
    const events = [];

    const request = fetch(api_host + '/event' , {
        method: 'GET',
        headers: headers,
    });


    return (dispatch) =>
        request.then(response => {
            response.json().then(data => {
                console.log(data.data);
                
                if(data.data.length > 0){
                    data.data.forEach(event => {
                        events.push({
                            id    : event.id,
                            title : event.title,
                            desc  : event.description,
                            songs : event.name,
                            allDay: true,
                            start : new Date(event.start),
                            end   : new Date(event.end)
                        });
                    });
                }
                
                console.log(events);
                dispatch({
                    type   : GET_EVENTS,
                    payload: events
                });
            });
        });
}


export function openNewEventDialog(data)
{
    return {
        type: OPEN_NEW_EVENT_DIALOG,
        data
    }
}

export function closeNewEventDialog()
{
    return {
        type: CLOSE_NEW_EVENT_DIALOG
    }
}

export function openEditEventDialog(data)
{
    return {
        type: OPEN_EDIT_EVENT_DIALOG,
        data
    }
}

export function closeEditEventDialog()
{
    return {
        type: CLOSE_EDIT_EVENT_DIALOG
    }
}


export function addEvent(newEvent)
{
    console.log(newEvent);
    return (dispatch, getState) => {
        // const request = axios.post('/api/calendar-app/add-event', {
        //     newEvent
        // });

        const request = fetch(api_host + '/event' , {
            method: 'POST',
            body: JSON.stringify({        
              title: newEvent.title,
              description: newEvent.desc,
              start: newEvent.start,
              end: newEvent.end,
              song_id: newEvent.song_id,                    
              uid: decoded.user.id,
            }),
            headers: headers
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}

export function updateEvent(event)
{
    return (dispatch, getState) => {

        const request = axios.post('/api/calendar-app/update-event', {
            event
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}

export function removeEvent(eventId)
{
    return (dispatch, getState) => {

        const request = axios.post('/api/calendar-app/remove-event', {
            eventId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}





