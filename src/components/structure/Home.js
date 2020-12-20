import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/Index";
import { deleteEvent, getEventList } from "../events/helper/apicalls";
import Base from "./Base";
import "./style.css";
const Home = () => {
  const [eventslist,setEventslist]=useState(); 
  const preload = () => {
    if(isAuthenticated()){
      const {user,token}=isAuthenticated();
      getEventList(user._id,token)
      .then(data => {
        if(data.error){
          console.log(data.error);
        }
        else{
          setEventslist(data);
        }
      })
    }
  }
  useEffect(preload, []);
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
  return (
    <Base>
      <div className="container py-3">
        {!isAuthenticated() && 
            <div>
              <h1>
              Create the events 
              </h1>

              <br/>
              <Link to="/signin" className="btn btn-md btn-dark mb-3">SignIn </Link>
            </div>
        }

        {eventslist && eventslist.map((event,index) => {
          return <div key={index} className="card">
          <div className="row ">
            <div className="col-md-7 px-3">
              <div className="card-block px-6">
                <h4 className="card-title">
                  {event.name}
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
                >
                  Delete
                
                </button>

              </div>
            </div>

            <div className="col-md-5">
              <img
                className="d-block"
                src={`http://localhost:8000/${event.eventImage}`}
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

export default Home;
