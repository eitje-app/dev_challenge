import { useEffect } from 'react';
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

const DateSelectorBar = ({min, max, reportDate, onReportDateChange, referenceDate, onReferenceDateChange}) => {

    useEffect(() => {
        if (reportDate === min) {
            onReferenceDateChange(undefined);
        } else {
            const newRefDate = correctRefDate(reportDate, referenceDate);
            onReferenceDateChange(newRefDate);
        }
    }, [min, reportDate, referenceDate, onReferenceDateChange])

    return (
        <div className="date-selector-bar">
            <div>logo goes here</div>
            <DateSelector title="Report Date" min={min} max={max} selectedDate={reportDate} onDateChange={onReportDateChange} />
            {referenceDate &&
                <DateSelector title="Reference Date" min={min} max={reportDate} selectedDate={referenceDate} onDateChange={onReferenceDateChange} />}
        </div>
    )
}

export default DateSelectorBar;