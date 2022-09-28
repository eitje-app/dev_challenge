import { useEffect, useState } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { getDateRange, getWorkResults} from '../../utils';
import DateSelectorBar from '../DateSelectorBar/DateSelectorBar';
import Overview from '../Overview/Overview';
import "./Layout.css";

const Layout = () => {
    const {urlReportDate, urlReferenceDate} = useParams();
    const [dateRange, setDateRange] = useState();
    const [workResults, setWorkResults] = useState([]);
    const [referenceResults, setReferenceResults] = useState([]);

    useEffect(() => {
        getDateRange().then(setDateRange);
    }, []);

    useEffect(() => {
        if (urlReportDate) {
            getWorkResults(urlReportDate).then(serverResponse => setWorkResults(serverResponse.result));
        }
    }, [urlReportDate])

    useEffect(() => {
        if (urlReferenceDate) {
            getWorkResults(urlReferenceDate).then(serverResponse => setReferenceResults(serverResponse.result));
        }
    }, [urlReferenceDate])

    return (<>
            {dateRange && <DateSelectorBar min={dateRange.min} max={dateRange.max} />}
            <div className="overview-detailview-container">
                <Overview workResults={workResults} referenceResults={referenceResults} />
                <div className="detail-view">
                    <Outlet />
                </div>
            </div>
        </>)
}

export default Layout;