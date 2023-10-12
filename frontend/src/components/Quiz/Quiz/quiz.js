import React, { useEffect, useState } from "react";
import "../Quiz/quiz.css";
import Questions from "../Question/question";

import { moveNextQuestion, movePreviousQuestion } from "../../../hooks/FetchQuestion";
import { PushAnswer } from "../../../hooks/setResult";

//redux store import
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result)
    const { queue, trace } = useSelector(state => state.questions)
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    //next button event handler 
    function onNext() {
        if (trace < queue.length) {
            // increase the trace value by one using moveNextAction
            dispatch(moveNextQuestion());
        //     // insert a new result in the array
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
        // reset the value of the checked variable
        setChecked(undefined)
    }

    //previous button event handler 
    function onPrevious() {
        if (trace > 0) {
            // decrease the trace value by one using movePreviousAction
            dispatch(movePreviousQuestion());
        }
    }

    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

    // finished exam after the last question
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace="true"></Navigate>
    }

    return (
        <div className="quizpage">
            <br/>
            <h1 className="quizheading">Quiz Application</h1>

            {/* display questions */}
            <Questions onChecked={onChecked} />

            <div className="quizbtn">
                {trace > 0 ? <button className="btnPrev" onClick={onPrevious}>Previous</button> : <div></div>}
                <button className="btnNext" onClick={onNext}>Next</button>
            </div>
            <br />
        </div>
    )
}