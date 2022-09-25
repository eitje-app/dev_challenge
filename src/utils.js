import {BACKEND_URL, TOTAL} from "./constants";

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
    const url = `${BACKEND_URL}/workresults?date=${date}`;
    return serverCall(url);
};

const setIncrementField = (map, key) => {
    map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);
}

const getSetMap = (parentMap, key, setterFunction) => {
    if (!parentMap.has(key)) {
        parentMap.set(key, new Map());
    }
    setterFunction(parentMap.get(key));
}

export const getWorkResultsOverview = (workResults) => {
    const overviewMap = new Map();

    workResults.forEach(({subject, domain, learningObjective, exerciseId}) => {
        getSetMap(overviewMap, subject, (domainMap) => {
            getSetMap(domainMap, domain, (learningObjectiveMap) => {
                getSetMap(learningObjectiveMap, learningObjective, (exerciseIdMap) => {
                    setIncrementField(exerciseIdMap, exerciseId);
                    setIncrementField(exerciseIdMap, TOTAL);
                    setIncrementField(learningObjectiveMap, TOTAL);
                    setIncrementField(domainMap, TOTAL);
                    setIncrementField(overviewMap, TOTAL);
                });
            });
        });
    });

    return overviewMap;
}