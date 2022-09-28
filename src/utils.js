import {BACKEND_URL, META} from "./constants";

const serverCall = (url) => (
    fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
);

export const getDateRange = () => {
    const url = `${BACKEND_URL}/daterange`;
    return serverCall(url);
};

export const getWorkResults = (date) => {
    const dateOfMonth = Number(date.split("-")[2]);
    const url = `${BACKEND_URL}/workresults?date=${dateOfMonth}`;
    return serverCall(url);
};

export const getExerciseDetail = (id, date) => {
    const dateOfMonth = Number(date.split("-")[2]);
    return serverCall(`${BACKEND_URL}/exercise?id=${id}&date=${dateOfMonth}`);
}

const setCorrectTotalCount = (map, key, correct) => {
    if (!map.has(key)) {
        map.set(key, {
            correct: 0,
            total: 0
        });
    }
    let obj = map.get(key);
    obj.total++;
    correct && obj.correct++;
}

const getSetMap = (parentMap, key, setterFunction) => {
    if (!parentMap.has(key)) {
        parentMap.set(key, new Map());
    }
    setterFunction(parentMap.get(key));
}

export const getWorkResultsOverview = (workResults) => {
    const overviewMap = new Map();

    workResults.forEach(({subject, domain, learningObjective, exerciseId, correct}) => {
        getSetMap(overviewMap, subject, (domainMap) => {
            getSetMap(domainMap, domain, (learningObjectiveMap) => {
                getSetMap(learningObjectiveMap, learningObjective, (exerciseIdMap) => {
                    setCorrectTotalCount(exerciseIdMap, exerciseId, correct);
                    setCorrectTotalCount(exerciseIdMap, META, correct);
                    setCorrectTotalCount(learningObjectiveMap, META, correct);
                    setCorrectTotalCount(domainMap, META, correct);
                    setCorrectTotalCount(overviewMap, META, correct);
                });
            });
        });
    });

    return overviewMap;
}

export const hasSelectedExercise = (map, id) => {
    let result;
    if (map.has(id)) {
        result = true;
    } else {
        result = false;
        map.forEach((value) => {
            if (!result && value instanceof Map && hasSelectedExercise(value, id)) {
                result = true;
            }
        });
    }
    return result;
}