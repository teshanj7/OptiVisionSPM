import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect} from "react";
import UserContext from "./components/ContextComponents/ContextComponent";


//headers
import UserHeader from './components/UserHeader/UserHeader';
import DoctorHeader from './components/DoctorHeader/DoctorHeader';
import DoctorFooter from './components/DoctorFooter/DoctorFooter';
import UserFooter from './components/UserFooter/FNfooter';


//UserManagementSystem
import Index from "./components/Index/Index";
import Login from './components/Login/Login';
import AddUser from './components/AddUser/AddUser';
import PatientHome from './components/PatientHomePage/Phomepage';
import DoctorHome from './components/DoctorHome/DoctorHomePage';
import ViewProfile from './components/ViewUserDetails/ViewUserDetails';
import UpdateUserDetails from './components/UpdateUserDetails/UpdateUserDetails';

//Cataract Application
import EyeTestDashboard from "./components/EyeTestDashboard/EyeTestDashboard";
import CreateCatForm from "./components/CreateCataractForm/CreateCataractForm";
import ViewCatData from "./components/ViewCataractData/ViewCataractData";
import SingleCatData from "./components/SingleCataractData/SingleCataractData";
import UpdateCatData from "./components/UpdateCataractData/UpdataCataractData";
import DoctorViewCatData from "./components/DoctorViewAllCataractData/DoctorViewAllCataractData";
import DoctorViewSingleCatData from "./components/DoctorViewSingleCataractData/DoctorViewSingleCataractData";

//Quiz
import Main from "./components/Quiz/Main/main";
import Quiz from "./components/Quiz/Quiz/quiz";
import QuizResult from "./components/Quiz/Result/result";
import { CheckUserExist } from './helper/helper';

//Glaucoma Application
import GlaucomaForm from "./components/GlaucomaForm/GlaucomaForm";


//AppointmentSystem
import CreateAppointment from "./components/TJaddAppointment/TJAddAppointment";
import ViewAllAppointment from "./components/TJViewAllAppointments/TJViewAllAppointment";
import UpdateAppointment from './components/TJUpdateAppointment/TJUpdateAppointment';
import AppointmentDashboard from "./components/TJAppointmentDashboard/TJAppointmentDashboard";
import ViewAllDoctors from './components/TJViewDoctors/TJViewDoctors';
import PaymentPortal from './components/TJPaymentPortal/TJPaymentPortal';
import FAQPage from './components/TJAppointmentFaq/AppointmentFaq';
import PaymentPage from './components/TJPaymentPage/TJPaymentPage';

 
//RecoveryReschedule
import DCreatedRecoveryPlans from './components/DoctorRecoverySchedule/DCreatedPlans';
import SingleRecoveryPlan from './components/DoctorRecoverySchedule/SingleRecoveryPlan';
import NewRecoveryPlan from './components/DoctorRecoverySchedule/DRecoveryCreate';
import UpdateRecoveryPlan from './components/DoctorRecoverySchedule/DRecoveryUpdate';
import DRelatedAppoinment from './components/DoctorRecoverySchedule/DRelatedAppoinment';
import PRecoveryView from './components/PatientRecoveryPlan/PRecoveryView'
// PrescriptionDetailsPage
import PrescriptionDetailsPage from './components/PatientRecoveryPlan/PRecoveryDetails'


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

  console.log(user)

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
          <Route path='/EyeTestMgmt' element={<EyeTestDashboard/>}/>
          <Route path='/CreateCataractForm' element={<CreateCatForm/>}/>
          <Route path='/ViewCataractData/:id' element={<ViewCatData/>}/>
          <Route path='/Cataract/:id' element={<SingleCatData/>}/>
          <Route path='/UpdateCataract/:id' element={<UpdateCatData/>}/>
          <Route path='/ViewAllCataract' element={<DoctorViewCatData/>}/>
          <Route path='/DoctorviewCataract/:id' element={<DoctorViewSingleCatData/>}/>

          {/* Quiz */}
          <Route path='/root' element={<Main/>}/>
          <Route path='/quiz' element={<CheckUserExist><Quiz/></CheckUserExist>}/>
          <Route path='/result' element={<CheckUserExist><QuizResult/></CheckUserExist>}/>

          {/* Glaucoma Application */}
          <Route path='/GlaucomaForm' element={<GlaucomaForm/>}/>


          {/* Appointment Management */}
          <Route path='/addAppointment/:id' element={<CreateAppointment/>}/>
          <Route path='/viewAllAppointments' element={<ViewAllAppointment/>}/>
          <Route path='/updateAppointment/:id' element={<UpdateAppointment/>}/>
          <Route path='/AppointmentMgmt' element={<AppointmentDashboard/>}/>
          <Route path='/ViewAllOpticians' element={<ViewAllDoctors/>}/>
          <Route path='/PaymentPortal' element={<PaymentPortal/>}/>
          <Route path='/AppointmentFaq' element={<FAQPage/>}/>
          <Route path='/UserPayments' element={<PaymentPage/>}/>


          {/* Recovery Application Doctor Related */}
          <Route path="/DCreatedRecoveryPlans" element={<DCreatedRecoveryPlans />} />
          <Route path='/NewRecoveryPlan' element={<NewRecoveryPlan/>}/>
          <Route path="/UpdateRecoveryPlan/:id" element={<UpdateRecoveryPlan/>} />
          <Route path="/DRelatedAppoinment" element={<DRelatedAppoinment/>} />

          {/* Recovery Application Patient Related */}
          <Route path="/PRecoveryView" element={<PRecoveryView/>} />
          <Route path="/prescription/:patientName/:appointmentReason" element={<PrescriptionDetailsPage />} />
          

            

        </Routes>
        {/* {user?.UserType === 'Doctor' && <DoctorFooter />} */}
        {/* {user?.UserType === 'Patient' && <UserFooter/>} */}
        {user?.UserType === 'Patient'? (
          <UserFooter />
        ) : (
          <DoctorFooter />
        )}

      </div>
     </UserContext.Provider>
  </Router>
  );
}

export default App;
