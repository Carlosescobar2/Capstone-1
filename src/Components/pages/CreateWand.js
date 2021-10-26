import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";

import{Cores, Woods} from '../../data/wandsData'
import './CreateWand.css'




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
            <button value="PhoenixFeather"onClick={e => setWand({...wand,wandcore:e.target.value})}>PhoenixFeather</button>
            <button value="Dragon Heart-String"onClick={e => setWand({...wand,wandcore:e.target.value})}>Dragon Heart-String</button>
            <button value="Unicorn Tail Hair"onClick={e => setWand({...wand,wandcore:e.target.value})}>Unicorn Tail Hair</button>
           

         {/* {Cores.map((core, i) => 
            //  <button  key={i} onClick={coresMerge}>{core.wandcore}</button>
             

         )} */}
         	{/* <div className='answer-section'>
						{Cores[Choosecore].wandcore.map((wandcore) => (
							<button onClick={() => {coresMerge(wandcore.PhoenixFeather, wandcore.UnicornTailHair, wandcore.DragonHeartString);}}>{wandcore.}</button>
						))}
					</div> */}
      
          
        </div>

         <div className="woodSection"><br /><br />
          <h2>Choose your a Wood</h2>

          <button value="Elder"onClick={e => setWand({...wand, wandwood:e.target.value})}>Elder</button>
          <button value="Holly" onClick={e=> setWand({...wand, wandwood:e.target.value})}>Holly</button>
          <button value="Yew" onClick={e=> setWand({...wand, wandwood:e.target.value})}>Yew</button>

          

          <div className="connectObjects" value={setWand} onClick={e=> wand}>Finish</div>
          <h2>{JSON.stringify(wand)}</h2>
        {/* {Woods.map((wood, i)=>
        <button className='woodBtns' key={i}>{wood.wandwood}</button> 
        )} */}
 

        </div>
        </div>
    )
}
export default CreateWand;
