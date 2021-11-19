import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";


import "./Certification.css"


import Wand3 from '../ThreeWands/wand3'

import HogwartsSeal from '../../Pictures/hogwarts2seal-removebg-preview.png'

const Certification = () => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();  
    const [house, setHouse] = useState('')
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


    
	useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();

        
        },[user,loading]);

        useEffect(() => {
            try { 
                db.collection("users")
                 .where("uid", "==", user?.uid)
                 .get()
                 .then((querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                     setHouse(doc.data().house);
                     setwandType(doc.data().wandQuality[0]);
                     setwandMaterial(doc.data().wandQuality[1])
                   });
                 });
             }
              catch (err) {
               console.error(err);
             }
            
            }
            
        )


    return (
        <div className="finalBody">
            <div className="finalHeader">
                <button className="logoutBtn" onClick={logout}>Logout</button>
                <h2>You are a Wizard</h2>
            </div>

           
          <div className="certBackground">
            <div className="certificatePage">
              <img className="hogwartsSeal" src={HogwartsSeal}/>
              <h2 className="witchCraft">Hogwarts School of WitchCraft and Wizardly</h2>
                <h2 className='flex'> Congratulations <span className='cursiveName'>{name}</span>.You are now a wizard at Hogwarts. Your house at Hogwarts is <span className="cursiveName">{house}</span> and you will make a great wizard. Below is displayed the wand that you created at Olivander's shop.</h2>
                  <div className="finalWandDisplay">

                     <Wand3 wandType={wandType} setwandType={setwandType} wandMaterial={wandMaterial} setwandMaterial={setwandMaterial}/>

                  </div>
            </div>
            </div>
            
        </div>
    )
}

export default Certification;
