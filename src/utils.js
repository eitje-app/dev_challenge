import {BACKEND_URL} from "./constants";

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