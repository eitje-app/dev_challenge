import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Exercise from './components/Exercise/Exercise';
import './App.css';

function App() {

    return (
        <div className="App">
             <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/reportDate/:urlReportDate" element={<Layout />} />
                <Route path="/reportDate/:urlReportDate/referenceDate/:urlReferenceDate" element={<Layout />}>
                    <Route index element={<div>Kies een opdracht</div>} />
                    <Route path="exercise/:id" element={<Exercise />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
