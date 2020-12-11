import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const Navbar = ()=>{
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
  const renderList=()=>{
    if(state){
       return [
        <li key="2"><Link className="btn waves-effect waves-light #64b5f6 blue lighten-2" to="/Add">Add temperature</Link></li>,
        <li key="3"><button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={()=>{
          localStorage.clear();
          dispatch({type: "CLEAR"});
          history.push('/login');
        }}>Logout</button></li>
       ]
    }else{
      return [
        <li key="5"><Link to="/login">Login</Link></li>,
            <li key="6"><Link to="/signup">Signup</Link></li>
      ]

    }
  }

    return(
        <nav>
        <div className="nav-wrapper" >
          <Link to={state?"/":"/login"} className="brand-logo left">logo</Link>
          <ul id="nav-mobile" className="right">
           {renderList()}
          </ul>
        </div>
        
      </nav>
    )
}

export default Navbar;