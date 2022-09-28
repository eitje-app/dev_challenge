import { Routes, Route } from "react-router-dom";
import DetailView from './components/DetailView/DetailView';
import Exercise from './components/Exercise/Exercise';
import './App.css';

function App() {

    return (
        <div className="App">
             <Routes>
                <Route path="/" element={<DetailView />} />
                <Route path="/reportDate/:urlReportDate" element={<DetailView />} />
                <Route path="/reportDate/:urlReportDate/referenceDate/:urlReferenceDate" element={<DetailView />}>
                    <Route index element={<div>Kies een opdracht</div>} />
                    <Route path="exercise/:id" element={<Exercise />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
