import { useState } from "react";
import { META } from "../../constants";
import { getWorkResultsOverview } from "../../utils";
import './Overview.css';

const OverviewRow = ({label, value, refValue, expanded=false}) => {

    const [showSubRows, setShowSubRows] = useState(expanded);

    const toggleShowRows = () => {
        setShowSubRows(!showSubRows);
    }

    const hasSubRows = value instanceof Map;
    const metaData = hasSubRows ? value.get(META) : value;
    let refMetaData;
    if (refValue !== undefined) {
        const refHasSubRows = refValue instanceof Map;
        refMetaData = refHasSubRows ? refValue.get(META) : refValue;
    }

    const subRows = [];
    if (hasSubRows) {
        value.forEach((subValue, key) => {
            let subRefValue = refValue instanceof Map ? refValue.get(key) : undefined;
            if (key !== META) {
                subRows.push(
                    <OverviewRow label={key} value={subValue} refValue={subRefValue} />
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
                {refValue !== undefined && <span>{refMetaData.correct} of {refMetaData.total} ({Math.round(refMetaData.correct / refMetaData.total * 100)}%)</span> }
            </div>
            {hasSubRows && <div className={`overview-row-subrows ${showSubRows ? "overview-row-subrows-visible" : ""}`}>
                {subRows}
            </div>}
        </div>
    );
}

const Overview = ({workResults, referenceResults}) => {

    if (workResults.length === 0) {
        return (
            <div>No results</div>
        )
    }

    let workResultsOverview = getWorkResultsOverview(workResults);
    let referenceResultsOverview = getWorkResultsOverview(referenceResults)

    return (
        <div className="overview"> 
            <OverviewRow value={workResultsOverview} refValue={referenceResultsOverview} label="Exercises correctly answered today" expanded={true} />
        </div>
    )
}

export default Overview;