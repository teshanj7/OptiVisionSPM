import React, { useEffect, useState } from "react";
import "../Quiz/question.css";
import { useDispatch, useSelector } from 'react-redux';
// import data from "../database/data";
import visual from "../../database/visual_acuity.jpg";
import color from "../../database/color_blindness.jpg";

// Custom Hook
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { updateResult } from "../../hooks/setResult";

export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    useSelector(state => console.log(state));
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    const image = [visual,color];

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

            <img src={image[questions?.id-1]} alt={`Image for question ${questions?.id}`}/>
        r
            <h2 className="ques">{questions?.question}</h2>

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

                            <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}