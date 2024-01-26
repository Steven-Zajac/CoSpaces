import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Dash,
    LandingPage,
    Loading,
    LoginForm,
    LoginRegister,
    NavBar,
    RaiseError,
    RegistrationForm,
    RegistrationConfirmation,
    Reservations,
    UserData,
    UserHome,

} from './index';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<RegistrationForm />} />
                <Route path='/register/:userId' element={<RegistrationConfirmation />}/>
                <Route path='/login' element={<LoginRegister />}/>
                <Route path='/user/:userId/home' element={<UserHome />}/>
                <Route path='/user/:userId/details' element={<UserData />}/>
                {/*<Route path='/user/:userId/modify' element={<h1>UPDATE USER DETAILS include delete button</h1>}/>*/}
                <Route path='/reservations/user/:userId' element={<Reservations />}/>
                <Route path='/reservations/:resId' element={<h1>View Reservation Details</h1>}/>
                <Route path='/reservations/:resId/modify' element={<h1>New Reservation Form (to patch)</h1>}/>
                <Route path='/reservations/new' element={<h1>New Reservation Form</h1>}/>
                <Route path='*' element={<RaiseError />}/>
            </Routes>
        </Router>
    )
};

export default App;