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
var decoded = [];

//----------Api config ---------
const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');
headers.append('authorization', 'Bearer ' + token);

const events = [
    {
        id    : 0,
        title : 'All Day Event very long title',
        allDay: true,
        start : new Date(2018, 3, 0),
        end   : new Date(2018, 3, 1)
    },
    {
        id   : 1,
        title: 'Long Event',
        start: new Date(2018, 3, 7),
        end  : new Date(2018, 3, 10)
    },


]


export function getEvents()
{
    // const request = axios.get( api_host + '/event');
    console.log(headers);
    const request = axios.get(api_host + '/event', {
        headers: headers,
        params: {
          token: ''
        }
    });

    // return (dispatch) =>
    //     request.then((response) =>
    //         console.log(response)
    //         // dispatch({
    //         //     type   : GET_EVENTS,
    //         //     payload: response.data
    //         // })
    //     );

    return (dispatch) => 
        dispatch({
            type   : GET_EVENTS,
            payload: events
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
    return (dispatch, getState) => {
        console.log(newEvent);
        const request = axios.post('/api/calendar-app/add-event', {
            newEvent
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
