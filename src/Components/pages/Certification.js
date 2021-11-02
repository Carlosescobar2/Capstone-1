import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";

import "./Certification.css"

const Certification = () => {
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


    
	useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();
        
        },);


    return (
        <div classname="finalBody">
            <div className="finalHeader">
                <h2>You are a Wizard {name}</h2>
            </div>

            <div className="certificatePage">
                <h2>Congratualtions you are now a wizard at Hogwarts. Below you have your HogWarts house and wand you created at Olivander's Shop</h2>

            </div>
        </div>
    )
}

export default Certification
