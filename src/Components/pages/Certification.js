import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";


import "./Certification.css"

const Certification = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();  
    const [house, setHouse] = useState('')


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
                   });
                 });
             }
              catch (err) {
               console.error(err);
             }
            
            }
            
        )


    return (
        <div classname="finalBody">
            <div className="finalHeader">
                <button className="logoutBtn" onClick={logout}>Logout</button>
                <h2>You are a Wizard</h2>
            </div>
            <div className="certificatePage">
                <h2> Congratualtions {name} you are now a wizard at Hogwarts. Your house at Hogwarts is {house} and you will make a great wizard. Below is displayed the wand that you created at Olivander shop. The wand consist of </h2>
                <div className="finalWandDisplay">

            </div>
            <div className="finalHouseDisplay">
            </div>

            </div>
           
            
        </div>
    )
}

export default Certification
