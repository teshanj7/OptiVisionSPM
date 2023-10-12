import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../Main/main.css";
import { useDispatch } from "react-redux";
import { setUserId } from "../../../redux/result_reducer";

export default function Main() {

    const inputRef = useRef(null);
    const dispatch = useDispatch()

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    return (
        <div className="QuizDashboard">
            <br/>
            <h1 className="Quizheading">Quiz Application</h1>
            <br/>
            <div className="Quizmaincontent">
                <ol className="quizruleslist">
                    <li className="quizrules">You will be asked 10 questions one after another.</li>
                    <li className="quizrules">10 points is awarded for the correct answer.</li>
                    <li className="quizrules">Each question has three options. You can choose only one option.</li>
                    <li className="quizrules">You can review and change answers before the quiz finish.</li>
                    <li className="quizrules">The result will be declared at the end of the quiz.</li>
                </ol>

                <form className="quizMainform">
                    <input ref={inputRef} type="text" placeholder="Username" className="quizformInput"/>
                </form>
                <br/>
                <div className="quizstartbtn">
                    <Link className="startbtn" to={'/quiz'} onClick={startQuiz}>Start Quiz</Link>
                </div>
                <br/>
            </div>
            <br/><br/>
        </div>
    )
}