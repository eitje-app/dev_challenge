const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').createServer(app);


const PORT = 4000;
const DATA_FILE = __dirname + '/Data/work.json';
const NOW = new Date("2015-03-24T11:30:00Z");

console.log(NOW);

// Initialize data.
const resultsByDate = [];
const dateRange = {
    min: null,
    max: null
};

// assuming 1 month time interval of records
JSON.parse(fs.readFileSync(DATA_FILE))
    .filter(workResult => {
        const date = new Date(`${workResult.SubmitDateTime}Z`);
        return date <= NOW;
    }).map(workResult => ({
        submittedAnswerId: workResult.SubmittedAnswerId,
        submitDateTime: new Date(`${workResult.SubmitDateTime}Z`).getTime(),
        correct: workResult.Correct === 1,
        progress: workResult.Progress,
        userId: workResult.UserId,
        exerciseId: workResult.ExerciseId,
        difficulty: Number(workResult.Difficulty),
        subject: workResult.Subject,
        domain: workResult.Domain,
        learningObjective: workResult.LearningObjective
    })).forEach(workResult => {
        const submitDate = new Date(workResult.submitDateTime);
        const dateOfMonth = submitDate.getDate();
        if (resultsByDate[dateOfMonth] === undefined) {
            resultsByDate[dateOfMonth] = [];
            const timeString = submitDate.toISOString().split('T')[0];
            if (dateRange.min === null) {
                dateRange.min = timeString;
            }
            dateRange.max = timeString;
        }
        resultsByDate[dateOfMonth].push(workResult);
    });

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/daterange', (req, res) => {
    res.send(JSON.stringify(dateRange));
});

app.get('/workresults', (req, res) => {
    const {date} = req.query;
    let result = resultsByDate[date] || [];
    res.send(JSON.stringify({
        dateOfMonth,
        result
    }));
});

app.get('/exercise', (req, res) => {
    const {id, date} = req.query;
    let result = resultsByDate[date] || [];
    res.send(JSON.stringify({
        id,
        result: result.filter(workResult => workResult.exerciseId == id)
    }));
});

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
