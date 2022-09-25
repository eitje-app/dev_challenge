import { useState } from "react";
import { TOTAL } from "../../constants";
import { getWorkResultsOverview } from "../../utils";
import './Overview.css';

const OverviewRow = ({label, value, expanded=false}) => {

    const [showSubRows, setShowSubRows] = useState(expanded);

    const toggleShowRows = () => {
        setShowSubRows(!showSubRows);
    }

    const hasSubRows = isNaN(value);
    const numericValue = hasSubRows ? value.get(TOTAL) : value;

    const subRows = [];
    if (hasSubRows) {
        value.forEach((subValue, key) => {
            if (key !== TOTAL) {
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
                <span>{numericValue}</span>
            </div>
            {hasSubRows && <div className={`overview-row-subrows ${showSubRows ? "overview-row-subrows-visible" : ""}`}>
                {subRows}
            </div>}
        </div>
    );
}

const Overview = ({workResults}) => {

    let workResultsOverview = getWorkResultsOverview(workResults);

    return (
        <div className="overview"> 
            <OverviewRow value={workResultsOverview} label="Exercises completed today" expanded={true} />
        </div>
    )
}

export default Overview;