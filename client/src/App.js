import logo from './logo.svg';
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Sensor from './components/screens/Sensor';
import Add from './components/screens/Add';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import {reducer,intitalState} from './reducers/userReducer';

export const UserContext = createContext();
const Routing = () =>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")) ;
    
    if(user){
      dispatch({type:"USER",payload:user});
      
    }else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/login');
    }
  },[])
  return(
    <Switch>
        <Route exact path="/">
        <Home/>
        </Route>
        <Route path="/login">
        <Login/>
        </Route>
        <Route path="/signup">
        <Signup/>
        </Route>
        <Route path="/Add">
        <Add/>
        </Route>
        <Route path="/sensor/:sensorname">
        <Sensor/>
        </Route>
    </Switch>  
  )
}

function App() {
  const [state,dispatch] =useReducer(reducer,intitalState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
