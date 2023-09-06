import React from "react";
import '../Index/Index.css';

export default function Index(){
    return(
        <div className= "index_bg">
            <div>
                <h1 className="name">OptiVision</h1>
                <ul class="nav justify-content-end nav-underline" id="IndexHeading">
                    <li class="nav-item1" id="Login">
                        <a class="nav-link" href="/login" id="LoginLink">LOGIN</a>
                    </li>
                    <li class="nav-item1" id="Signup">
                        <a class="nav-link" href="/add" id="SignupLink">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <div className="Mainhe">
                <p>Welcome to the OptiVision</p>
            </div>
            <div className="he1">
                <p>Eye Care Services For You</p>
            </div>
            <div className="he2">
                <p align = "left">Give Your Vision The Treatment It Deserves</p>
            </div>
        </div>
    )
}

//check