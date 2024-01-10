import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<h1>Hello World</h1>} />
            </Routes>
        </Router>
    )
}

export default App;