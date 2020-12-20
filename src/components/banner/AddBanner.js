import React,{useState} from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/Index";

import Base from "../structure/Base";
import { createBanner } from "./helper";


const Banner = () => {
  const {user,token} = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        description:"",
        siteLink:"",
        bannerImage:"",
        doredirect:false
    });
    const {name,description,bannerImage,doredirect,siteLink} = values;
    
    const performRedirect = () => {
      if(doredirect){
        return <Redirect to="/" />
      }
    }
    const handleChange = name => event => {
        const value=name==="bannerImage"?event.target.files[0]:event.target.value;
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
        formData.set("bannerImage",bannerImage);
        formData.set("siteLink",siteLink);

        // making request to helper function 
        createBanner(user._id,token,formData)
        .then(data => {
          if(data.error){
            console.log(data.error);
          }
          else{
            console.log("banner created successfully");
            setValues({
              ...values,
              name:"",
            description:"",
            siteLink:"",
            bannerImage:"",
            doredirect:true
            })
          }
        })

       
    }
    const bannerCreationForm = () => {
        return (
            <form className="p-3 ">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="banner name"
              value={name}
              required  
              onChange={handleChange("name")}
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={handleChange("description")}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="site Link"
              className="form-control"
              placeholder="website link"
              value={siteLink}
              onChange={handleChange("siteLink")}
              required
            />
          </div>
          <div className="form-group">
            <span>add a banner image</span>
            <label className="btn btn-block ">
              <input
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              onChange={handleChange("bannerImage")}
              />
            </label>
          </div>

          <button type="submit" onClick={onSubmit} className="btn btn-primary">
            Create An Banner
          </button>
        </form>
        )
    }
  return (
    <Base>
    <div className="row">
      <div className="col-md-6 container-fluid text-left mt-5  event-body">
            {bannerCreationForm()}
            {performRedirect()}
          
      </div>
    </div>
    </Base>
  );
};

export default Banner;
