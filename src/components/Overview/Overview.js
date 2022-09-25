import { useState } from "react";
import { META } from "../../constants";
import { getWorkResultsOverview } from "../../utils";
import './Overview.css';

const OverviewRow = ({label, value, expanded=false}) => {

    const [showSubRows, setShowSubRows] = useState(expanded);

    const toggleShowRows = () => {
        setShowSubRows(!showSubRows);
    }

    const hasSubRows = value instanceof Map;
    const metaData = hasSubRows ? value.get(META) : value;

    const subRows = [];
    if (hasSubRows) {
        value.forEach((subValue, key) => {
            if (key !== META) {
                subRows.push(
                    <OverviewRow value={subValue} label={key} />
                );
            }
        });
    }

    return (
        <div className="overview-row">
            <div className="overview-row-main">
                <span>
                    {hasSubRows && <span className="overview-row-collapse-expand-sign" onClick={toggleShowRows}>{showSubRows ? "-" : "+"}</span>}
                    {label}
                </span>
                <span>{metaData.correct} of {metaData.total} ({Math.round(metaData.correct / metaData.total * 100)}%)</span>
            </div>
            {hasSubRows && <div className={`overview-row-subrows ${showSubRows ? "overview-row-subrows-visible" : ""}`}>
                {subRows}
            </div>}
        </div>
    );
}

const Overview = ({workResults}) => {

    if (workResults.length === 0) {
        return (
            <div>No results</div>
        )
    }

    let workResultsOverview = getWorkResultsOverview(workResults);

    return (
        <div className="overview"> 
            <OverviewRow value={workResultsOverview} label="Exercises correctly answered today" expanded={true} />
        </div>
    )
}

export default Overview;