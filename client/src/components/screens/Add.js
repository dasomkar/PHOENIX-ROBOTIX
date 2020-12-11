import React, {useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Add=()=>{
    const history = useHistory();
    const [sensor_name,setsensor_name]= useState("");
    const [temperature,settemperature] = useState("");
    // const [time,settime] = useState("");

    const postDetails=()=>{

         fetch("/receive_temperature",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 sensor_name,
                 temperature,
                 time : new Date().getTime()
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Add data Successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }

    return(
        <div className="card input-filed" style={{margin:"30px auto", padding:"20px", textAlign: "center", maxWidth:"500px"}}>
           <input type="text" placeholder="sensor name" value={sensor_name} onChange={(e)=>setsensor_name(e.target.value)}/>
           <input type="text" placeholder="temperature" value={temperature} onChange={(e)=>settemperature(e.target.value)}/>
           {/* <input type="hidden" placeholder="body" value={new Date().getTime()} onChange={(e)=>settime(e.target.value)}/> */}

            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action" onClick={()=>postDetails()}>Post</button>
        </div>    
    )
}
export default Add;