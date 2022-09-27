import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExerciseDetail } from '../../utils';
import "./Exercise.css"

const Exercise = ({reportDate}) => {

    const {id} = useParams();
    const [exerciseDetails, setExerciseDetails] = useState();

    useEffect(() => {
        if (id !== undefined && reportDate !== undefined) {
            getExerciseDetail(id, reportDate).then(serverResponse => setExerciseDetails(serverResponse.result));
        }
    }, [id, reportDate]);

    return (
        <div className="exercise-detail">
            <div className="exercise-detail-meta">
                <div>{reportDate}</div>
                <div>Opdracht: {id}</div>
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
        </div>
    )
};

export default Exercise;