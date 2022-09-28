import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import DateSelector from '../DateSelector/DateSelector';
import "./DateSelectorBar.css"

const correctRefDate = (reportDate, referenceDate) => {
    let repDate = new Date(reportDate);
    let refDate = new Date(referenceDate || reportDate);
    if (repDate <= refDate) {
        refDate.setDate(repDate.getDate() - 1);
        return refDate.toISOString().split('T')[0];
    }
    return referenceDate;
}

const DateSelectorBar = ({min, max}) => {

    const navigate = useNavigate();
    const {urlReportDate, urlReferenceDate} = useParams();

    const onReferenceDateChange = (newRefDate) => {
        navigate(`/reportDate/${urlReportDate}/referenceDate/${newRefDate}`);
    }

    const onReportDateChange = useCallback((newReportDate, oldReferenceDate = urlReferenceDate) => {
        let newRefDate = correctRefDate(newReportDate, oldReferenceDate);
        let refString = newRefDate ? `/referenceDate/${newRefDate}` : "";
        navigate(`/reportDate/${newReportDate}${refString}`);
      }, [navigate, urlReferenceDate]);

    useEffect(() => {
        if (!urlReportDate || !urlReferenceDate) {
            onReportDateChange(urlReportDate || max, urlReferenceDate);
        }
    }, [max, urlReportDate, urlReferenceDate, onReportDateChange]);

    return (
        <div className="date-selector-bar">
            <div className="date-selector-logo"></div>
            {urlReportDate && 
                <DateSelector title="Rapportdatum" min={min} max={max} selectedDate={urlReportDate} onDateChange={onReportDateChange} />}
            {urlReferenceDate &&
                <DateSelector title="Referentie datum" min={min} max={urlReportDate} selectedDate={urlReferenceDate} onDateChange={onReferenceDateChange} />}
        </div>
    )
}

export default DateSelectorBar;