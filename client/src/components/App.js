import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    Dash,
    Homepage,
    Loading,
    LoginForm,
    NavBar,
    RegistrationForm,
    RegistrationConfirmation,
    RaiseError,

} from './index';

//const userId = JSON.parse(localStorage.getItem('userId'));
//console.log(userId)

// if user is not logged in or no userId in local storage, 
// then redirect to login page for any of the component 


const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/register' element={<RegistrationForm />} />
                <Route path='/register/:userId' element={<RegistrationConfirmation />}/>
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/home/:userId' element={<Dash />}/>
                <Route path='/user/:userId/details' element={<h1>VIEW USER DETAILS</h1>}/>
                <Route path='/user/:userId/modify' element={<h1>UPDATE USER DETAILS include delete button</h1>}/>
                <Route path='/reservations/user/:userId' element={<h1>View User Reservations</h1>}/>
                <Route path='/reservations/:resId' element={<h1>View Reservation Details</h1>}/>
                <Route path='/reservations/:resId/modify' element={<h1>New Reservation Form (to patch)</h1>}/>
                <Route path='/reservations/new' element={<h1>New Reservation Form</h1>}/>
                <Route path='*' element={<RaiseError />}/>
            </Routes>
        </Router>
    )
}

export default App;