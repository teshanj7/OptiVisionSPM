import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect} from "react";
import UserContext from "./components/ContextComponents/ContextComponent";


//headers
import UserHeader from './components/UserHeader/UserHeader';
import DoctorHeader from './components/DoctorHeader/DoctorHeader';
// import DoctorFooter from './components/DoctorFooter/DoctorFooter';


//UserManagementSystem
import Index from "./components/Index/Index";
import Login from './components/Login/Login';
import AddUser from './components/AddUser/AddUser';
import PatientHome from './components/PatientHomePage/Phomepage';
import DoctorHome from './components/DoctorHome/DoctorHomePage';
import ViewProfile from './components/ViewUserDetails/ViewUserDetails';
import UpdateUserDetails from './components/UpdateUserDetails/UpdateUserDetails';

//Cataract Application
import CreateCatForm from "./components/CreateCataractForm/CreateCataractForm";
import ViewCatData from "./components/ViewCataractData/ViewCataractData";
import SingleCatData from "./components/SingleCataractData/SingleCataractData";
import UpdateCatData from "./components/UpdateCataractData/UpdataCataractData";
import DoctorViewCatData from "./components/DoctorViewAllCataractData/DoctorViewAllCataractData";
import DoctorViewSingleCatData from "./components/DoctorViewSingleCataractData/DoctorViewSingleCataractData";

//Glaucoma Application
import GlaucomaForm from "./components/GlaucomaForm/GlaucomaForm";

function App() {

  // user details pass
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);


  return (
    <Router>
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">

      {user?.UserType === 'Patient'? (
          <UserHeader />
        ) : (
          <DoctorHeader />
        )}
        <Routes>

          {/* user management */}
          <Route path='' element={<Index />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/add' element={<AddUser/>}/>
          <Route path='/PatientHome/:id' element={<PatientHome/>} />
          <Route path='/DoctorHome/:id' element={<DoctorHome/>}/>
          <Route path='/profile/:id' element={<ViewProfile/>}/>
          <Route path='/updateProfile/:id' element={<UpdateUserDetails/>}/>
          
          {/* Cataract Application */}
          <Route path='/CreateCataractForm' element={<CreateCatForm/>}/>
          <Route path='/ViewCataractData/:id' element={<ViewCatData/>}/>
          <Route path='/Cataract/:id' element={<SingleCatData/>}/>
          <Route path='/UpdateCataract/:id' element={<UpdateCatData/>}/>
          <Route path='/ViewAllCataract' element={<DoctorViewCatData/>}/>
          <Route path='/DoctorviewCataract/:id' element={<DoctorViewSingleCatData/>}/>

          {/* Glaucoma Application */}
          <Route path='/GlaucomaForm' element={<GlaucomaForm/>}/>

        </Routes>
        {/* {user?.UserType === 'Doctor' && <DoctorFooter />} */}

      </div>
     </UserContext.Provider>
  </Router>
  );
}

export default App;
