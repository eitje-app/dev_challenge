import { useEffect, useState } from "react";
import { META } from "../../constants";
import { getWorkResultsOverview } from "../../utils";
import './Overview.css';

const MetaData = ({value, refValue}) => {

    const hasSubRows = value instanceof Map;
    const metaData = hasSubRows ? value.get(META) : value;
    let refMetaData;
    let percentage;
    let refPercentage;
    let percentageDiff;

    if (metaData === undefined) {
        return <></>
    }

    percentage = Math.round(metaData.correct / metaData.total * 100);

    if (refValue !== undefined) {
        const refHasSubRows = refValue instanceof Map;
        refMetaData = refHasSubRows ? refValue.get(META) : refValue;
    }

    if (refMetaData !== undefined) {
        refPercentage = Math.round(refMetaData.correct / refMetaData.total * 100);
        percentageDiff = percentage - refPercentage;
    }

    return (
        <div className="metadata">
            <div>{metaData.correct}</div>
            <div>{metaData.total}</div> 
            <div>{percentage}%</div>

            {refMetaData !== undefined && <>
                <div>{refMetaData.correct}</div>
                <div>{refMetaData.total}</div>
                <div>{refPercentage}%</div>
                <div className={percentageDiff < 0 ? "metadata-decline" : (percentageDiff > 0 ? "metadata-growth" : "")}>
                    {Math.abs(percentageDiff)}%
                </div>
            </>}
            {refMetaData === undefined && <div className="metadata-noref">geen referentiegegevens</div> }
        </div>
    )
}

const OverviewRow = ({label, value, refValue, expanded=false}) => {

    const [showSubRows, setShowSubRows] = useState(expanded);

    const toggleShowRows = () => {
        setShowSubRows(!showSubRows);
    }

    const hasSubRows = value instanceof Map;

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
                <div className="overview-row-main-label-container">
                    {hasSubRows && <div className="overview-row-collapse-expand-sign" onClick={toggleShowRows}>{showSubRows ? "-" : "+"}</div>}
                    <div className="overview-row-main-label">{label}</div>
                </div>
                <MetaData value={value} refValue={refValue} />
            </div>
            {hasSubRows && <div className={`overview-row-subrows ${showSubRows ? "overview-row-subrows-visible" : ""}`}>
                {subRows}
            </div>}
        </div>
    );
}

const Overview = ({workResults, referenceResults}) => {

    const [workResultsOverview, setWorkResultsOverview] = useState();
    const [referenceResultsOverview, setReferenceResultsOverview] = useState();

    useEffect(() => {
        setWorkResultsOverview(getWorkResultsOverview(workResults));
    }, [workResults]);

    useEffect(() => {
        setReferenceResultsOverview(getWorkResultsOverview(referenceResults));
    }, [referenceResults]);

    return (
        <div className="overview">
            {workResults.length === 0 && <div className="overview-nodata">Geen gegevens voor rapportperiode</div>}
            {workResults.length > 0 && <>
                <div className="overview-explanation">
                    <div className="overview-explanation-column-headers">
                        <div>&#x2611;</div>
                        <div>&#120506;</div>
                        <div>%</div>
                        <div>&#x2611; <sub>ref</sub></div>
                        <div>&#120506; <sub>ref</sub></div>
                        <div>% <sub>ref</sub></div>
                        <div>% &Delta;</div>
                    </div>
                </div>
                <OverviewRow value={workResultsOverview} refValue={referenceResultsOverview} label="Alle opdrachten" expanded={true} />
            </>}
        </div>
    )
}

export default Overview;