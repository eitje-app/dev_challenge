import { SUBJECT } from "../../constants";

const Overview = ({workResults}) => {

    const overviewRows = [];

    for (const [key, value] of Object.entries(SUBJECT)) {
        overviewRows.push(
            <div className="overview-row">
                {value}: {workResults.filter(result => result.subject === value).length}
            </div>
        )
    }

    return (
        <div className="overview">
            Exercises by subject:
            {overviewRows}
            Total: {workResults.length}
        </div>
    )
}

export default Overview;