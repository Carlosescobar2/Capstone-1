
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase/firebase"

import {questions} from '../../data/dataQuestions'

import BannerGryffindor from "../../Pictures/gryfinndorFlag.gif"
import BannerRavenClaw from "../../Pictures/harry-potter-ravenclaw.gif"
import BannerSlytherin from "../../Pictures/Slytherin.gif"
import BannerHufflePuff from "../../Pictures/HufflePuff.gif"
import { Link, NavLink } from "react-router-dom";

import CreateWand from "../pages/CreateWand";





function Dashboard() {
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
	
	
	const [totalGryffindor, setGryffindor] = useState(0);
	const [totalSlytherin, setSlytherin] = useState(0);
	const [totalRavenclaw, setRavenclaw] = useState(0);
	const [totalHufflepuff, setHufflepuff] = useState(0);


	const [house, setHouse] = useState('');

	const [showQuiz, setShowQuiz] = useState(false);
	const [showHouse, setShowHouse] = useState(false);
	
	
	const AnswerHandler = (gryffindor, slytherin, ravenclaw, hufflepuff) => {
		setGryffindor(totalGryffindor + gryffindor);
		setSlytherin(totalSlytherin + slytherin);
		setRavenclaw(totalRavenclaw + ravenclaw);
		setHufflepuff(totalHufflepuff + hufflepuff);

		switch (Math.max(totalGryffindor, totalSlytherin, totalRavenclaw, totalHufflepuff)) {
			case totalGryffindor: setHouse("Gryffindor")
				break;
			case totalSlytherin: setHouse("Slytherin")
				break;
			case totalRavenclaw: setHouse("Ravenclaw")
				break;
			case totalHufflepuff: setHouse("Hufflepuff")
				break;
			default:
				break; 
		};

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowHouse(true);
		}
	};
	const [banner, setBanner] = useState('')
	const ChangeBackground = () => {
		if (house === 'Gryffindor' && showHouse===true) {
			setBanner(BannerGryffindor);}
		if (house === 'Slytherin' && showHouse===true) {
			setBanner(BannerSlytherin);}
		if (house === 'Ravenclaw' && showHouse===true) {
			setBanner(BannerRavenClaw);}
		if (house === 'Hufflepuff' && showHouse===true) {
			setBanner(BannerHufflePuff);}
	};

	useEffect(() => {
		if(showHouse){return ChangeBackground()}
        if(loading) return;
        if(!user) return history.replace("/");
        fetchUserName();
        },);
 

	return (
		<div>
		<div className='main-title'>
			<h1>Become a Wizard</h1>
			</div>
		<div className='app'>
			{showQuiz ? (
			<div>
			{showHouse ? (
				<div className='score-section'>
					You belong in 
					<br/>
					<p className='house'>{house}</p>
          			<img src={banner}/>
		  <Link to="/CreateWand"><button>{name} now make your wand</button></Link>
          
				</div>
        
				
			) : (
				<>
				<div className='part-two'>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].options.map((option) => (
							<button onClick={() => {AnswerHandler(option.gryffindor, option.slytherin, option.ravenclaw, option.hufflepuff);}}>{option.optionText}</button>
						))}
					</div>
				</div>
					
				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
					<div className='intro-text'>
						Welcome
					</div>
					<button className='start-button button-loader' onClick={() => setShowQuiz(true)}>Start</button>
				</div>
		</>
		)}
		</div>
		</div>
	);
}

export default Dashboard;