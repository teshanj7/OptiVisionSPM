import { useEffect, useState } from "react"
import data, {answers} from "../database/data.js";
import { useDispatch } from "react-redux";

//redux actions
import * as Action from '../redux/question_reducer'

// //fectch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({isLoading: false, apiData: [], serverError: null})

    useEffect(()=> {
        setGetData(previous => ({...previous, isLoading: true}));

        //async function fetch backend data
        (async () => {
            try{
                let question = await data;

                if(question.length > 0){
                    setGetData(previous => ({...previous, isLoading: false}));
                    setGetData(previous => ({...previous, apiData: {question, answers}}));

                    //dispatch an action
                    dispatch(Action.startExamAction({question, answers}));
                }else{
                    throw new Error("No Question Available");
                }
            } catch(error){
                setGetData(previous => ({...previous, isLoading: false}));
                setGetData(previous => ({...previous, serverError: error}));
            }
        })();
    },[dispatch]);

    return [getData,setGetData];
}

//Move action dispatch function
export const moveNextQuestion = () => async(dispatch) => {
    try{
        dispatch(Action.moveNextAction()); // increase trace by 1
    }catch (error){
        console.log(error)
    }
}

// Previous action dispatch function
export const movePreviousQuestion = () => async(dispatch) => {
    try{
        dispatch(Action.movePreviousAction()); // decrease trace by 1
    }catch (error){
        console.log(error)
    }
}