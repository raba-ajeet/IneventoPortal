import React,{useState,useEffect} from "react";



import Base from "../structure/Base";

import "../structure/style.css";
import { isAuthenticated } from "../auth/helper/Index";
import { deleteEvent, getAllEvents } from "./helper/apicalls";
const { BASE_URL } = require("../../backend");
// fadf
const AllEvents = () => {
  const [eventlist,setEventslist]=useState(); 
  const preload = () => {
      getAllEvents()
      .then(data => {
        if(data.error){
          console.log(data.error);
        }
        else{
          setEventslist(data);
        }
      })
    }
    const deleteAEvent = (eventId) => {
      const {user,token}=isAuthenticated();
      deleteEvent(user._id,token,eventId)
      .then(data => {
        if(data.error){
          console.log(data.error);
        }
        else{
          preload();
        }
      })
    }
  useEffect(preload, []);

  return (
    <Base>

      <div className="container py-3">
        

        {eventlist && eventlist.map((event,index) => {
          return <div key={index} className="card">
          <div className="row ">
            <div className="col-md-7 px-3">
              <div className="card-block px-6">
                <h4 className="card-title">
                  {event.name}
                  hashashas
                  {event.eventImage}
                </h4>
                <p className="card-text">
                  The Carousel code can be replaced with an img src, no problem.
                  The added CSS brings shadow to the card and some adjustments
                  to the prev/next buttons and the indicators is rounded now. As
                  in Bootstrap 3
                </p>
                <p className="card-text">
                  Made for usage, commonly searched for. Fork, like and use it.
                  Just move the carousel div above the col containing the text
                  for left alignment of images
                </p>
                <br />
                {/* <button className="mt-auto btn btn-primary  ">Read More</button> */}
                <button className="mt-auto btn btn-danger  ml-5 "
                  onClick={() => {deleteAEvent(event._id)}}
                >Delete</button>

              </div>
            </div>

            <div className="col-md-5">
              <img
                className="d-block"
                src={`${BASE_URL}/${event.eventImage}`}
                alt=""
                style={{maxHeight:"300px"}}
              />
            </div>
          </div>
        </div>
        })}
        
      </div>
    </Base>
  );
};

export default AllEvents;
