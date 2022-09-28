import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExerciseDetail } from '../../utils';
import "./Exercise.css"

const Exercise = () => {

    const {exerciseId, urlReportDate} = useParams();
    const [exerciseDetails, setExerciseDetails] = useState();

    useEffect(() => {
        if (exerciseId !== undefined && urlReportDate !== undefined) {
            getExerciseDetail(exerciseId, urlReportDate).then(serverResponse => setExerciseDetails(serverResponse.result));
        }
    }, [exerciseId, urlReportDate]);

    return (
        <div className="exercise-detail">
            <div className="exercise-detail-meta">
                <div>{urlReportDate}</div>
                <div>Opdracht: {exerciseId}</div>
                {exerciseDetails && exerciseDetails.length > 0 && exerciseDetails[0].difficulty &&
                    <div>Difficulty: {exerciseDetails[0].difficulty}</div>
                }
            </div>
            {exerciseDetails && exerciseDetails.length > 0 &&
                <>
                    <div className="exercise-detail-answers exercise-detail-answers-header">
                        <div>&#128337;</div>
                        <div>&#128100;</div>
                        <div>Antwoord ID</div>
                        <div>&#x2611;</div>
                    </div>
                    {exerciseDetails.map((detail) => {
                        const date = new Date(detail.submitDateTime);
                        return <div className="exercise-detail-answers" key={detail.submittedAnswerId}>
                            <div>{String(date.getUTCHours()).padStart(2, 0)}:{String(date.getUTCMinutes()).padStart(2, 0)}:{String(date.getUTCSeconds()).padStart(2, 0)}</div>
                            <div>{detail.userId}</div>
                            <div>{detail.submittedAnswerId}</div>
                            <div>{detail.correct ? "Correct" : "Incorrect"}</div>
                        </div>
                    })}
                </>
            }
            {exerciseDetails && exerciseDetails.length === 0 &&
            <div>Geen data</div>}
        </div>
    )
};

export default Exercise;