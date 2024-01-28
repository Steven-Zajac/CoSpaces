import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    GlobalStyle,
    LoginRegister,
    ModifyReservation,
    NavBar,
    NewReservation,
    RaiseError,
    RegistrationConfirmation,
    Reservations,
    UserData,
    UserHome,

} from './index';

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <NavBar />
            <Routes>
                <Route path='/' element={<LoginRegister />}/>
                <Route path='/register/:userId' element={<RegistrationConfirmation />}/>
                <Route path='/user/:userId/home' element={<UserHome />}/>
                <Route path='/user/:userId/details' element={<UserData />}/>
                <Route path='/reservations/user/:userId' element={<Reservations />}/>
                <Route path='/reservations/modify/:resId' element={<ModifyReservation />}/>
                <Route path='/reservations/new' element={<NewReservation />}/>
                <Route path='*' element={<RaiseError />}/>
                {/*<Route path='/reservations/:resId' element={<h1>View Reservation Details</h1>}/>*/}
            </Routes>
        </Router>
    )
};

export default App;