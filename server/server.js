const express = require('express');
// const { MongoClient } = require("mongodb");
const { getQuestions, getAnswers, postQuestion, postAnswer, reportAnswer, markAnsAsHelpful, reportQuestion, markQAsHelpful } = require('../db/db.js');

//Express variables
const app = express();
const port = 3000;

//Express connection
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

/* REQUEST HANDLERS */

app.get('/', (req, res) => {
  res.send('Hello World!, nothing here for you...');
});

//Get list of all questions
app.get('/qa/questions', (req, res) => {
  getQuestions(req)
  .then((results) => {
    var returnObj = {
      product_id: req.query.product_id,
      results: results,
    }
    res.send(returnObj);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//Get list of all answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  if (!req.params.question_id) {
    res.sendStatus(500);
  }
  getAnswers(req)
  .then((results) => {
    let returnObj = {
      question: req.params.question_id,
      page: req.query.page || 0,
      count: results.length,
      results: results[0].answers,
    }
    res.send(returnObj);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//Post a question
app.post('/qa/questions', (req, res) => {
  if (!req.query.product_id) {
    res.sendStatus(500);
  }
  postQuestion(req)
  .then((result) => {
    console.log(result);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//Post an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  if (!req.params.question_id) {
    res.sendStatus(500);
  }
  console.log('answrr Post request: ', req.query)
  postAnswer(req)
  .then((result) => {
    console.log(result);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

//Mark question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  if (!req.params.question_id) {
    res.sendStatus(500);
  }
  markQAsHelpful(req)
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
});

//Report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  if (!req.params.question_id) {
    res.sendStatus(500);
  }
  reportQuestion(req)
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
});

//Mark answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  if (!req.params.answer_id) {
    res.sendStatus(500);
  }
  markAnsAsHelpful(req)
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
});

//Report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  if (!req.params.answer_id) {
    res.sendStatus(500);
  }
  reportAnswer(req)
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
});