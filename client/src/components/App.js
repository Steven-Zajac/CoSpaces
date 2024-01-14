import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
    NavBar,
    RegistrationForm,
    RegistrationConfirmation,
    RaiseError,

} from './index';


const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<h1>HOMEPAGE</h1>} />
                <Route path='/register' element={<RegistrationForm />} />
                <Route path='/register/:userId' element={< RegistrationConfirmation />}/>
                <Route path='/login' element={<h1>LOGIN HERE</h1>}/>
                {/*<Route />*/}
                {/*<Route />*/}
                {/*<Route />*/}
                <Route path='*' element={<RaiseError />}/>
            </Routes>
        </Router>
    )
}

export default App;