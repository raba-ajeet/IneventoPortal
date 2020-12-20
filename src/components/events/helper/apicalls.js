import { API } from "../../../backend"

export const createEvent = (userId,token,event) => {
    return fetch(`${API}/${userId}/event/create`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:event
    }).then(res => {
        return res.json()
    }).catch(err=> console.log(err))
}

export const getEventList = (userId,token) => {
    return fetch(`${API}/events/org/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const deleteEvent = (userId,token,eventId) => {
    return fetch(`${API}/${userId}/event/${eventId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
}

export const getAllEvents = () => {
    return fetch(`${API}/events`,{
        method:"GET",
        headers:{
            Accept:"application/json"
        }
    }).then(res => res.json())
    .catch(err => console.log(err))
}