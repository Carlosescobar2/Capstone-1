import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";



import{Cores, Woods} from '../../data/wandsData'
import './CreateWand.css'
import Wand1, { CylinderBufferGeometry, CylinderGeometry } from "../ThreeWands/wand1";

import Phoenix from "../../Pictures/Phoenix_feather_-_PAS-removebg-preview.png"


const CreateWand = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();  

    const fetchUserName = async () => {
        try {
          const query = await db
            .collection("users")
            .where("uid", "==", user?.uid)
            .get();
          const data = await query.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
     
          const [wand, setWand] = useState({wandcore:'', wandwood:''})


          // const [properWand, setProperWand] = useState()
	useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();
        
        },);

    return (
        <div className="pageStyle">
          <div className="headerPg">
            <h1>{name}</h1>
            <h1>Welcome to Olivander's wand creater</h1><br /><br />
            </div>


        <div className="coresSection"><br /><br />
            <h2>Choose a core for your wand</h2>

            {/* <button><img src="../../Pictures/Phoenix_feather_-_PAS-removebg-preview.png" alt="my image"  className="PhoenixBtn" value="PhoenixFeather"onClick={e => setWand({...wand,wandcore:e.target.value})} /></button> */}

            <button value="PhoenixFeather"onClick={e => setWand({...wand,wandcore:e.target.value})}>PhoenixFeather</button>
            <button value="Dragon Heart-String"onClick={e => setWand({...wand,wandcore:e.target.value})}>Dragon Heart-String</button>
            <button value="Unicorn Tail Hair"onClick={e => setWand({...wand,wandcore:e.target.value})}>Unicorn Tail Hair</button>
        
        <div className="showWands">
         
        </div>
      
          
        </div>
         <div className="woodSection"><br /><br />
          <h2>Choose your a Wood</h2>

          <button value="Elder"onClick={e => setWand({...wand, wandwood:e.target.value})}>Elder</button>
          <button value="Holly" onClick={e=> setWand({...wand, wandwood:e.target.value})}>Holly</button>
          <button value="Yew" onClick={e=> setWand({...wand, wandwood:e.target.value})}>Yew</button>

          <div className="wandType">
             <h2>{JSON.stringify(wand)}</h2>
          </div>

         

          <div className="connectObjects" value={setWand} onClick={e=> wand}>Finish</div>
          
        {/* {Woods.map((wood, i)=>
        <button className='woodBtns' key={i}>{wood.wandwood}</button> 
        )} */}
 

        </div>
        <Wand1 />
        </div>
    )
}
export default CreateWand;
