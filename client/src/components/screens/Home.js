import React,{useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';


const Home=()=>{
  return(
    <div className="row">
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Card Title</span>
          <li key ="2" className="waves-effect waves-light btn"><Link to="/sensor/sensor-1">sensor-1</Link></li>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Home;