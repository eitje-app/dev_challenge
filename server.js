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
        const dateOfMonth = new Date(workResult.submitDateTime).getDate();
        if (resultsByDate[dateOfMonth] === undefined) {
            resultsByDate[dateOfMonth] = [];
        }
        resultsByDate[dateOfMonth].push(workResult);
    })

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/workresults', (req, res) => {
    const dateOfMonth = req.query.date;
    const userId = req.query.userId;
    let result = resultsByDate[dateOfMonth];
    if (userId !== undefined) {
        result = result.filter(workResult => workResult.userId == userId);
    }
    res.send(JSON.stringify(result));
});

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
