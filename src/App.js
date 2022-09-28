import { Routes, Route } from "react-router-dom";
import DetailView from './components/DetailView/DetailView';
import Exercise from './components/Exercise/Exercise';
import './App.css';

function App() {

    return (
        <div className="App">
             <Routes>
                <Route path="/reportDate/:urlReportDate" element={<DetailView />}>
                    <Route index element={<div>Kies opdracht voor reportDate</div>} />
                    <Route path="exercise/:id" element={<Exercise />} />
                </Route>
                <Route path="/reportDate/:urlReportDate/referenceDate/:urlReferenceDate" element={<DetailView />}>
                    <Route index element={<div>Kies opdracht voor rapportDate</div>} />
                    <Route path="exercise/:id" element={<Exercise />} />
                </Route>
                <Route path="/" element={<DetailView />}>
                    <Route index element={<div>Kies opdracht</div>} />
                    <Route path="*" element={<div>no match</div>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
