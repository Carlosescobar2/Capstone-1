import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";



import{Cores, Woods} from '../../data/wandsData'
import './CreateWand.css'

import Certification from "./Certification";

import { Link } from "react-router-dom";


import Phoenix from "../../Pictures/Phoenix_feather_-_PAS-removebg-preview.png"
import Wand3 from "../ThreeWands/wand3";

import { setUserWand } from "../firebase/firebase";



const CreateWand = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();  

    const [wandType, setwandType] = useState('')
const [wandMaterial, setwandMaterial] = useState('')

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
      console.log(wandType)
      console.log(wandMaterial)


          // const [properWand, setProperWand] = useState()
	useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();
        
        },);

    return (
        <div className="pageStyle" id= 'wandCreatorPage'>
          <div className="headerPg">
            <h1>Welcome to Olivander's Wand Creater</h1><br /><br />
            </div>


        <div className="coresSection"><br /><br />
            <h2 className="coresText">Choose a Core </h2>

            {/* <button><img src="../../Pictures/Phoenix_feather_-_PAS-removebg-preview.png" alt="my image"  className="PhoenixBtn" value="PhoenixFeather"onClick={e => setWand({...wand,wandcore:e.target.value})} /></button> */}
          <div className="btnContainer">
            <button id="phoenixReveal" value="PhoenixFeather"onClick={e => setwandType('phoenix')}></button>
            <button id="dragonReveal" value="Dragon Heart-String" onClick={e => setwandType('dragon')}></button>
            <button id="unicornReveal" value="Unicorn Tail Hair"onClick={e => setwandType('unicorn')}></button>
            <button id="basiliskReveal" value="Basilisk" onClick={e => setwandType('basilisk')}></button>

            </div>
        <div className="showWands">
        <Wand3 wandType={wandType} setwandType={setwandType} wandMaterial = {wandMaterial} setwandMaterial={setwandMaterial}/>
        </div>

        <div>
          <button onClick={()=> setUserWand(user?.uid,wandType,wandMaterial)} className="finishWand"><Link className="finishLink" to="/Certification">Select Wand</Link></button>
        </div>
      

        </div>
         <div className="woodSection"><br /><br />
          <h2 className="woodsText">Choose your Wood</h2>

        <div className="btnContainer">
          <button id="elderReveal" value="Elder"onClick={e => setwandMaterial('elder')}></button>
          <button id="hollyReveal" value="Holly" onClick={e=> setwandMaterial('holly')}></button>
          <button id="yewReveal" value="Yew" onClick={e=> setwandMaterial('yew')}></button>
          <button id="blackThornReveal" value='BlackThorn' onClick={e=> setwandMaterial('blackHorn')}></button>
         </div>
          <div className="wandType">
            
          </div>

         
          
        {/* {Woods.map((wood, i)=>
        <button className='woodBtns' key={i}>{wood.wandwood}</button> 
        )} */}
 

        </div>
        </div>
    )
}
export default CreateWand;
