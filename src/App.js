import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { getDateRange, getWorkResults} from './utils';
import DateSelectorBar from './components/DateSelectorBar/DateSelectorBar';
import Overview from './components/Overview/Overview';
import DetailView from './components/DetailView/DetailView';
import Exercise from './components/Exercise/Exercise';
import './App.css';

function App() {

    const [dateRange, setDateRange] = useState();
    const [reportDate, setReportDate] = useState();
    const [referenceDate, setReferenceDate] = useState();
    const [workResults, setWorkResults] = useState([]);
    const [referenceResults, setReferenceResults] = useState([]);

    useEffect(() => {
        getDateRange().then(setDateRange);
    }, []);

    useEffect(() => {
        if (dateRange) {
            setReportDate(dateRange.max);
        }
    }, [dateRange]);

    useEffect(() => {
        if (reportDate) {
            getWorkResults(reportDate).then(serverResponse => setWorkResults(serverResponse.result));
        }
    }, [reportDate])

    useEffect(() => {
        if (referenceDate) {
            getWorkResults(referenceDate).then(serverResponse => setReferenceResults(serverResponse.result));
        }
    }, [referenceDate])

    return (
        <div className="App">
            {reportDate && <DateSelectorBar min={dateRange.min} max={dateRange.max} 
                reportDate={reportDate} onReportDateChange={setReportDate} 
                referenceDate={referenceDate} onReferenceDateChange={setReferenceDate}
            />}
            <div className="overview-detailview-container">
                <Overview workResults={workResults} referenceResults={referenceResults} />
                <Routes>
                    <Route path="/" element={<DetailView />}>
                        <Route index element={<div>Kies opdracht</div>} />
                        <Route path="exercise/:id" element={<Exercise reportDate={reportDate} />} />
                        <Route path="*" element={<div>no match</div>} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
