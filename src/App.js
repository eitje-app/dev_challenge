import { useEffect, useState } from 'react';
import { getDateRange, getWorkResults} from './utils';
import DateSelectorBar from './components/DateSelectorBar/DateSelectorBar';
import Overview from './components/Overview/Overview';
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
            const dateOfMonth = Number(reportDate.split("-")[2]);
            getWorkResults(dateOfMonth).then(serverResponse => setWorkResults(serverResponse.result));
        }
    }, [reportDate])

    useEffect(() => {
        if (referenceDate) {
            const dateOfMonth = Number(referenceDate.split("-")[2]);
            getWorkResults(dateOfMonth).then(serverResponse => setReferenceResults(serverResponse.result));
        }
    }, [referenceDate])

    return (
        <div className="App">
            {reportDate && <DateSelectorBar min={dateRange.min} max={dateRange.max} 
                reportDate={reportDate} onReportDateChange={setReportDate} 
                referenceDate={referenceDate} onReferenceDateChange={setReferenceDate}
            /> }
            <Overview workResults={workResults} referenceResults={referenceResults} />
        </div>
    );
}

export default App;
