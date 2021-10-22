import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase/firebase"
import { useHistory } from "react-router";

import WandsData from '../../data/wandsData'

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
      const[cores, setCores] = useState('')
      const[Woods, setWoods] = useState('')


      const[wand, setWands] = useState('')

   



	useEffect(() => {
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();
        },);

    return (
        <div>
            <h1>{name}</h1>
            <h1 className="wandHeaderPg">Welcome to Olivander's wand creater</h1><br /><br />

        <div className="coresSection">
            <h2>Choose a core for your wand</h2>
            <button>Unicorn Tail Hair</button>
            <button>PhoenixFeather</button>
            <button>Dragon HeartString</button>

        </div>
        </div>
    )
}

export default CreateWand 
