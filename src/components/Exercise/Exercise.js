import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExerciseDetail } from '../../utils';

const Exercise = ({reportDate}) => {

    const {id} = useParams();
    const [exerciseDetails, setExerciseDetails] = useState();

    useEffect(() => {
        getExerciseDetail(id, reportDate).then(serverResponse => setExerciseDetails(serverResponse.result));
    }, [id, reportDate]);

    return (
        <div className="exercise-detail">
            <div>{id}</div>
            <div>{reportDate}</div>
            {exerciseDetails && JSON.stringify(exerciseDetails)}
        </div>
    )
};

export default Exercise;