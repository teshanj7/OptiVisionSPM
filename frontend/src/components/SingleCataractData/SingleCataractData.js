import React, { useEffect, useState, useContext } from "react";
import { useParams} from "react-router-dom";
import axios from "axios"
import "../SingleCataractData/SingleCataractData.css";
import { toast, ToastContainer } from 'react-toastify';
import UserContexxt from '../ContextComponents/ContextComponent';
import userPic from '../SingleCataractData/usericon.jpg';

export default function SingleCataractData() {

    const [data, setData] = useState('');
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);

    const { id } = useParams();
    const { user } = useContext(UserContexxt);
    const userID = user._id

    useEffect(() => {
        fetch(`http://localhost:8040/CataractApplication/singleCataract/${id}`).then(response => {
            response.json().then(data => {
                setData(data);
            });
        });
    }, []);

    //show and hide comments
    const showComment = (data) => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setItem(data);
        }
    }

    //delete comment
    const DeleteComment = async (comment_id) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const response = await axios.delete(`http://localhost:8040/CataractApplication/singleCataract/${id}/comments/${comment_id}`);
            if (response.status === 200) {
                setTimeout(() => {
                    window.location.href = `/Cataract/${id}`;
                }, 2000);
                toast.success('comment deleted successfully', {
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

    //delete cataract data
    const DeleteData = async (_id) => {
        if (window.confirm("Are you sure you want to delete this details?")) {
            const response = await axios.delete(`http://localhost:8040/CataractApplication/deleteCataract/${id}`);
            if (response.status === 200) {
                setTimeout(() => {
                    window.location.href = `/ViewCataractData/${userID}`;
                }, 2000);
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
    if (!data) return '';

    return (
        <div className="SingleViewBody">
            <br />
            <div className="reactangleSinView">
                <h1 className="SingleViewHeading">Single Cataract Data</h1>
            </div>
            <div className="SingleViewCataract">
                <br />
                <div className="SingleCataract">
                    <img className="imageCard1" src={'http://localhost:8040/' + data.image} alt="P 1" width="30%"></img>
                    <div className="CataractContent">
                        <p>Fullname: {data.Fullname}</p>
                        <p>Email: {data.Email}</p>
                        <p>Address: {data.Address}</p>
                        <p>TelephoneNumber: {data.TelephoneNumber}</p>
                        <p>Age: {data.Age}</p>
                        <p>Gender: {data.Gender}</p>
                    </div>
                    <p className="Viewcomment" onClick={() => {
                        showComment(data);
                    }}>View Doctor Comments</p>
                    <button type="submit" className="Cataractupdatebtn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/UpdateCataract/${id}`
                    }}>Update Details</button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="Cataractdeletebtn" onClick={() => DeleteData(data._id)}>Delete Details</button>
                </div>
                <br />
            </div>
            <br /><br />
            {/* show comment */}
            {show && (
                <div className="showComment">
                    <div className="box">
                        <div className="commentpic">
                            <img src={'http://localhost:8040/' + data.image} />
                        </div>
                        <div className="details">
                            {/* card header */}
                            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                                <div className="card-pic">
                                    <br />
                                    <table border="0" align="center">
                                        <tr>
                                            <td><img src={userPic} className="usericon" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td><h5 className="UserName">{data.Fullname}</h5></td>
                                        </tr>
                                    </table>
                                    <br />
                                </div>
                            </div>

                            {/* comment Section */}
                            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}><br />
                                {item.comments.map((comment) => {
                                    return (<p className="comm">
                                        <span className="comment">{comment.comment}</span>
                                        <span className="material-symbols-outlined" id="cmntDeletebtn" onClick={() => DeleteComment(comment._id)}>
                                            delete
                                        </span>
                                    </p>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="close-button" onClick={() => {
                        showComment();
                    }}>
                        <span className="material-symbols-outlined material-symbols-outlined-button">
                            close
                        </span>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>

    )
}