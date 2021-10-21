import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase/firebase"

import {questions} from '../../data/dataQuestions'


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
	
	// Total score per house setters
	const [totalGryffindor, setGryffindor] = useState(0);
	const [totalSlytherin, setSlytherin] = useState(0);
	const [totalRavenclaw, setRavenclaw] = useState(0);
	const [totalHufflepuff, setHufflepuff] = useState(0);

	//Final result setter
	const [house, setHouse] = useState("Muggle");

	const [showQuiz, setShowQuiz] = useState(false);
	const [showHouse, setShowHouse] = useState(false);
	
	//Sorting function
	const answerHandler = (gryffindor, slytherin, ravenclaw, hufflepuff) => {
		setGryffindor(totalGryffindor + gryffindor);
		setSlytherin(totalSlytherin + slytherin);
		setRavenclaw(totalRavenclaw + ravenclaw);
		setHufflepuff(totalHufflepuff + hufflepuff);

		switch (Math.max(totalGryffindor, totalSlytherin, totalRavenclaw, totalHufflepuff)) {
			case totalGryffindor: setHouse("Gryffindor");
				break;
			case totalSlytherin: setHouse("Slytherin");
				break;
			case totalRavenclaw: setHouse("Ravenclaw");
				break;
			case totalHufflepuff: setHouse("Hufflepuff");
				break;
			default:
        console.log(gryffindor,slytherin,ravenclaw,hufflepuff)
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
	const changeBackground = () => {
		if (house === 'Gryffindor' && showHouse===true) {
			setBanner(require("../../Pictures/gryfinndorFlag.jpeg"));}
		if (house === 'Slytherin' && showHouse===true) {
			setBanner(require("../../Pictures/Slytherin.jpeg"));}
		if (house === 'Ravenclaw' && showHouse===true) {
			setBanner(require("../../Pictures/harry-potter-ravenclaw.jpeg"));}
		if (house === 'Hufflepuff' && showHouse===true) {
			setBanner(require("../../Pictures/HufflePuff.jpeg"));}
	};
	// Always check which house has most points in order to reveal the respective banner
	useEffect(() => {
		changeBackground()
	});

	return (
		<div>
		<div className='main-title'>Become a Wizard</div>
		<div className='app' style={{borderRadius:'7px', backgroundPosition: '50%', backgroundBlendMode:'normal', backgroundImage: `url(${banner})`}}>
			{showQuiz ? (
			<div>
			{showHouse ? (
				<div className='score-section'>
					You belong in 
					<br/>
					<p className='house'>{house}</p> 
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
							<button onClick={() => {answerHandler(option.gryffindor,option.slytherin, option.ravenclaw, option.hufflepuff);}}>{option.optionText}</button>
						))}
					</div>
				</div>
					
				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
					<div className='intro-text'>
					welcome
					</div>
					<button className='start-button button-loader' onClick={() => setShowQuiz(true)}>Start</button>
				</div>
		</>
		)}
		</div>
		</div>
	);
}
  
//   const[stateQuestion, setStateQuestion] = useState(0);

//   const[totalpointsGryffindor, setGryffindorPoints] = useState(0);
//   const[totalpointsRavenClaw, setRavenclawPoints] = useState(0);
//   const[totalpointsSlytherin, setSyltherinPoints] = useState(0);
//   const[totalpointsHufflePuff, setHufflePuffPoints] = useState(0);

//   const[house, setHouse]=useState('Muggle');


//   const[showQuiz, setShowQuiz] = useState(false);
//   const[showHouse, setShowHouse] = useState(false);


//   const AnswerHandler = (gryffindor, ravenclaw, syltherin, hufflepuff) => { 
//     setGryffindorPoints(totalpointsGryffindor + gryffindor); 
//     setRavenclawPoints(totalpointsRavenClaw + ravenclaw); 
//     setSyltherinPoints(totalpointsSlytherin + syltherin);
//     setHufflePuffPoints(totalpointsHufflePuff + hufflepuff); 

//     switch(Math.max(totalpointsGryffindor, totalpointsRavenClaw, totalpointsSlytherin, totalpointsHufflePuff)) { 
//       case totalpointsGryffindor: setHouse("Gryffindor")
//           break;
//       case totalpointsRavenClaw: setHouse("RavenClaw")
//           break; 
//       case totalpointsSlytherin: setHouse("Slytherin")
//           break; 
//       case totalpointsHufflePuff: setHouse("HufflePuff")
//           break; 
//       default:
  
//           break;
//     };
//     const nextQuestion = stateQuestion + 1; 
//     if(nextQuestion < questions.length) { 
//       setStateQuestion(nextQuestion);
//     } else  {
//         setShowHouse(true); 
//     };
//   };
//   useEffect(() => {
//     if (loading) return;
//     if (!user) return history.replace("/");
//     fetchUserName();
//     changeBackground();
//   }, [user, loading]);

//     const[banner, setBanner] = useState('')
// 	  const changeBackground = () => {
// 		  if (house === 'Gryffindor' && showHouse===true) {
// 			setBanner(require("../../Pictures/gryfinndorFlag.jpeg"));}
// 		  if (house === 'RavenClaw' && showHouse===true) {
// 			setBanner(require("../../Pictures/harry-potter-ravenclaw.jpeg"));}
// 	  	if (house === 'Slytherin' && showHouse===true) {
// 			setBanner(require("../../Pictures/Slytherin.jpeg"));}
// 		  if (house === 'Hufflepuff' && showHouse===true) {
// 			setBanner(require("../../Pictures/HufflePuff.jpeg"));}
// 	};


//   return (
//     <div>
// 		<div className='main-title'>Become Wizard</div>
// 		<div className='app' style={{borderRadius:'7px', backgroundPosition: '50%', backgroundBlendMode:'normal', backgroundImage: `url(${banner})`}}>
// 			{showQuiz ? (
// 			<div>
// 			{showHouse ? (
// 				<div className='score-section'>
// 					You belong in 
// 					<br/>
// 					<p className='house'>{house}</p> 
// 				</div>
				
// 			) : (
// 				<>
// 				<div className='part-two'>
// 					<div className='question-section'>
// 						<div className='question-count'>
// 							<span>Question {stateQuestion + 1}</span>/{questions.length}
// 						</div>
// 						<div className='question-text'>{questions[stateQuestion].questionText}</div>
// 					</div>
// 					<div className='answer-section'>
// 						{questions[stateQuestion].options.map((option) => (
// 							<button onClick={() => {AnswerHandler(option.gryffindor, option.slytherin, option.ravenclaw, option.hufflepuff);}}>{option.optionText}</button>
// 						))}
// 					</div>
// 				</div>
					
// 				</>
// 			)} </div>
// 		) : (
// 		<>
// 				<div className='intro-part'>
// 					<div className='intro-text'>
// 						Welcome answer the series of Questions to find where you truly belong
// 					</div>
// 					<button className='start-button button-loader' onClick={() => setShowQuiz(true)}>Start</button>
// 				</div>
// 		</>
// 		)}
// 		</div>
// 		</div>
// 	);
// }
  

export default Dashboard;