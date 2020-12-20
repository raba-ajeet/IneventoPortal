import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/Index";
import Base from "../structure/Base";
import "./events.css";
import { createEvent } from "./helper/apicalls";

const Events = () => {
  const {user,token} = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        description:"",
        eventImage:"",
        eventDate:"",
        eventTime:"",
        error:"",
        timing:"",
        success:false,
        doredirect:false
    });
    const {name,description,eventImage,eventDate,eventTime,doredirect} = values;
    
    const performRedirect = () => {
      if(doredirect){
        return <Redirect to="/" />
      }
    }
    const handleChange = name => event => {
        const value=name==="eventImage"?event.target.files[0]:event.target.value;
        setValues({
          ...values,
          [name]:value
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();

        // creation of formm data 
        var formData = new FormData();
        formData.set("name",name);
        formData.set("description",description);
        formData.set("eventImage",eventImage);
        const timing=eventDate+'T'+eventTime+'Z';
        formData.set("timing",timing);
        // making request to helper function 
        createEvent(user._id,token,formData)
        .then(data => {
          if(data.error){
            console.log(data.error);
          }
          else{
            console.log("event created successfully");
            console.log(data);
            setValues({
              ...values,
              name:"",
              description:"",
              eventImage:"",
              eventDate:"",
              eventTime:"",
              error:"",
              timing:"",
              doredirect:true
            })
          }
        })

       
    }
    const eventCreationForm = () => {
        return (
            <form className="p-3 ">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="event name"
              value={name}
              required  
              onChange={handleChange("name")}
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={handleChange("description")}
              required
            />
          </div>
          <div className="form-group">
            <span>add a event image</span>
            <label className="btn btn-block ">
              <input
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                
              onChange={handleChange("eventImage")}
              />
            </label>
          </div>
          <div className="form-group">
            <label>Select an date for your event</label>
              <input
                type="date"
                name="eventDate"
                className="form-control"
                value={eventDate}
                required
              onChange={handleChange("eventDate")}
              />
          </div>
          <div className="form-group">
            <label >Select an time for your event</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={eventTime}
                required
                onChange={handleChange("eventTime")}
              />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-primary">
            Create An event
          </button>
        </form>
        )
    }
  return (
    <Base>
    <div className="row">
      <div className="col-md-6 container-fluid text-left mt-5  event-body">
            {eventCreationForm()}
            {performRedirect()}
          
      </div>
    </div>
    </Base>
  );
};

export default Events;
