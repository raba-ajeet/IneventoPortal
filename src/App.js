
import React from 'react';
import Signin from './components/auth/Signin';
import SignUp from './components/auth/SignUp'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Events from './components/events/AddEvent';
import Home from './components/structure/Home';
import PrivateRoute from './components/auth/helper/PrivateRoutes';
import AdminRoute from './components/auth/helper/AdminRoutes';
import Banner from './components/banner/AddBanner';
import AllBanners from './components/banner/AllBanners';
import AllEvents from './components/events/AllEvents';


const App = () => {
  return (
    <div>
    <Router>
      <Switch>
          <Route exact path="/signup" component={SignUp}/>
          <Route path="/signin" component={Signin}/> 
          <PrivateRoute path="/createevent" component={Events} />
          <AdminRoute path="/createbanner" component={Banner}/>
          <AdminRoute path="/banners" component={AllBanners}/>
          <AdminRoute path="/events" component={AllEvents}/>
          <Route path="/" component={Home}/> 
       </Switch>
    </Router>
    </div>
  )
}

export default App
