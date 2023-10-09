import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from '../ContextComponents/ContextComponent';
import "../ViewCataractData/ViewCataractData.css";
import axios from "axios";

export default function ViewCataractData(){

    const history = useNavigate()
    const {user} = useContext(UserContext);
    const userID = user._id;

    const [data,setdata] = useState('');

    useEffect(()=>{
        getCataract();
    },[]);

    const getCataract = async () => {
        const response = await axios.get(`http://localhost:8040/CataractApplication/viewCataract/${userID}`);
        if(response.status === 200){
            setdata(response.data);
        }

    }

    return(
        <div className="ViewCataractBody">
            <br/>
            <div className="rectangleCatView">
                <h1 className="ViewCatHeading">View Cataracts</h1>
            </div>

            <br/>
            <div className="CataractCards">
                {data && data.map((cat, index) => {
                    return(
                        <div key={index}>
                            <div key={index} className="CataractContainer" onClick={() => {history("/Cataract/"+cat._id)}}>
                                <img className="imageCard" src={'http://localhost:8040/'+cat.image} alt="P 1" width="30%"></img>
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