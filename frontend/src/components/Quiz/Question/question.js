import React, { useEffect, useState } from "react";
import "../Question/question.css";
import { useDispatch, useSelector } from 'react-redux';
// import data from "../database/data";
import color_1 from "../quizImages/color_blindness_1.jpg";
import color_2 from "../quizImages/color_blindness_2.jpg";
import color_3 from "../quizImages/color_blindness_3.jpg";
import color_4 from "../quizImages/color_blindness_4.jpg";
import visual_1 from "../quizImages/visual_acuity_1.jpg";
import visual_2 from "../quizImages/visual_acuity_2.jpg";
import visual_3 from "../quizImages/visual_acuity_3.jpg";
import con_1 from "../quizImages/contrast_sensitivity_1.jpg";
import con_2 from "../quizImages/contrast_sensitivity_2.jpg";

// Custom Hook
import { useFetchQuestion } from "../../../hooks/FetchQuestion";
import { updateResult } from "../../../hooks/setResult";

export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    const image = [color_1,color_2,color_3,color_4,visual_1,visual_2,visual_3,con_1,con_2,con_2];

    useEffect(() => {
        dispatch(updateResult({ trace, checked }))
    }, [checked])

    function onSelect(i) {
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked }))
    }

    if (isLoading) return <h3 className="textloading">isLoading</h3>
    if (serverError) return <h3 className="textloading">{serverError || "Unknown Error"}</h3>

    return (
        <div className="questions">

            <br/>
            <img src={image[questions?.id-1]} className="quesImage" alt={`Image for question ${questions?.id}`}/>
        
            <h2 className="ques">{questions?.id}. {questions?.question}</h2>

            <ul className="allquestion" key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li className="q1" key={i}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                            />

                            <label className="text" htmlhtmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}