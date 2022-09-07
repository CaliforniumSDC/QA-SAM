## Introduction
This project's objective was to refactor an existing e-commerce website's backend for better performance. My task was to handle the 'questions & answers' data, and had to create API endpoints for: GET all Questions+Answers, POST Question, POST Answer, PUT questions as helpful, PUT question as reported, PUT answer as helpful, PUT answer as reported. The JSON objects returned from my server had to meet the exact structure as it was being used in the current front end.

## Tech Stack
* NodeJS, Express, MongoDB, NGINX
* Testing/Utilities: K6, Loader.io, AWS (EC2 Instances)

#### Performance:
These are loader.io results from this DB and server configured on AWS with an NGINX load balancer over 4 EC2 instances.
* GET Questions (/qa/questions)
![getquestions](https://user-images.githubusercontent.com/96403295/188888646-122c8bb6-06ff-4285-9af7-bb1589b24f09.png)
* GET Answers (/qa/questions/:question_id/answers)
![getanswers](https://i.gyazo.com/2cf74f19df9cbd0546647229c0ad4d27.gif)
* POST Questions (/qa/questions)
![postquestions](https://i.gyazo.com/2cf74f19df9cbd0546647229c0ad4d27.gif)
* POST Answers (/qa/questions/:question_id/answers)
![postanswers](https://i.gyazo.com/2cf74f19df9cbd0546647229c0ad4d27.gif)

## Installation

1. Clone the repo
```
git clone https://github.com/CaliforniumSDC/QuestionsAnswers.git
```

2. Install NPM dependencies
```
npm install
```

3. Run Server
```
npm run dev-server
```

4. Server will now be live at localhost:3000 and you can send requests to it. For example a GET reuqest to localhost:3000/qa/questions will return a list of questions (default 5).
