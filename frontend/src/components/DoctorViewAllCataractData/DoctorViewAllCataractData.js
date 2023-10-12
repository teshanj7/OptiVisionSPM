import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from '../ContextComponents/ContextComponent';
import axios from "axios";
import "../DoctorViewAllCataractData/DoctorViewAllCataractData.css";

export default function DoctorViewAllCataractData(){
    const history = useNavigate()
    const {user} = useContext(UserContext);
    const userID = user._id;

    const [data,setdata] = useState('');

    useEffect(()=>{
        getCataract();
    },[]);

    const getCataract = async () => {
        const response = await axios.get(`http://localhost:8040/CataractApplication/viewAllCataract`);
        if(response.status === 200){
            setdata(response.data);
        }

    }

    return(
        <div className="ViewallCataractBody">
            <br/>
            <div className="rectangleAllCatView">
                <h1 className="ViewAllCatHeading">All Cataract Details</h1>
            </div>
            <br/>
            <div className="CataractCards">
                {data && data.map((cat, index) => {
                    return(
                        <div key={index} className="CatCard">
                            <div key={index} className="CataractContainer" onClick={() => {history("/DoctorviewCataract/"+cat._id)}}>
                                <img className="imageCard" src={'http://localhost:8040/'+cat.image} alt="P 1" width="50%"></img>
                                <p className="para1">Fullname : {cat.Fullname}</p>
                                <p className="para1">Email : {cat.Email}</p>
                                <p className="para1">Address : {cat.Address}</p>
                                <p className="para1">TelephoneNumber : {cat.TelephoneNumber}</p>
                                <p className="para1">Age : {cat.Age}</p>
                                <p className="para1">Gender : {cat.Gender}</p>
                            </div>
                            <br/><br/>
                        </div>
                    )
                })}
            </div>
            <br/><br/>
        </div>
    )
}