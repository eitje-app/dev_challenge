import './App.css';
import { useEffect, useState } from 'react';
import { getDateRange, getWorkResults} from './utils';

function App() {

    const [dateRange, setDateRange] = useState();
    const [reportDate, setReportDate] = useState();
    const [workResults, setWorkResults] = useState([]);

    const onDateChange = (event) => {
        setReportDate(event.target.value);
    }

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

    return (
        <div className="App">
            {reportDate && <input type="date" min={dateRange.min} max={dateRange.max} value={reportDate} onChange={onDateChange} />}
            <div>
                {JSON.stringify(workResults)}
            </div>
        </div>
    );
}

export default App;
