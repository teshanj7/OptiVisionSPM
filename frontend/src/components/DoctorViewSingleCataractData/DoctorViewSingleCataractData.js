import React, {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios"
import "../DoctorViewSingleCataractData/DoctorViewSingleCataractData.css";
import { toast } from 'react-toastify';
import UserContext from '../ContextComponents/ContextComponent';

export default function DoctorViewSingleCataractData(){

    const[data,setData] = useState('');

    const {id} = useParams();
    const {user} = useContext(UserContext);
    const userID = user._id

    useEffect(() => {
        fetch(`http://localhost:8040/CataractApplication/singleCataract/${id}`).then(response => {
            response.json().then(data => {
                setData(data);
            });
        });
    }, []);

    console.log(data);

    const DeleteData = async (_id) => {
        if(window.confirm("Are You Sure You Want To Delete This Details?")){
            const response = await axios.delete(`http://localhost:8040/CataractApplication/deleteCataract/${id}`);
            if(response.status === 200){
                window.location.href = `/ViewAllCataract`;
                toast.success('Details Deleted Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    }
    if(!data) return '';

    return(
        <div className="SingleViewbody">
           <br/>
            <div className="reactangleDoctorSinView">
                <h1 className="SingleViewHeading">SINGLE CATARACT</h1>
            </div>
            <br/>

            <div className="SingleCataract">
                <br/>
                <img src={'http://localhost:8040/'+data.image} alt="P 1" width="50%"></img>
                <div className="SingleCataractContent">
                    <p>Fullname: {data.Fullname}</p>
                    <p>Email: {data.Email}</p>
                    <p>Address: {data.Address}</p>
                    <p>TelephoneNumber: {data.TelephoneNumber}</p>
                    <p>Gender: {data.Gender}</p>
                </div>
                <button type="submit" className="Cataractupdatebtn" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/ViewAllCataract`
                        }}>Cancel</button> &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="Cataractdeletebtn" onClick={()=> DeleteData(data._id)}>Delete Details</button>
                <br/><br/>                
            </div>
            <br/><br/>
        </div>
    )
}