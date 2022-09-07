## Introduction
This project's objective was to refactor an existing e-commerce website's backend for better performance. My task was to handle the 'questions & answers' data, and had to create API endpoints for: GET all Questions+Answers, POST Question, POST Answer, PUT questions as helpful, PUT question as reported, PUT answer as helpful, PUT answer as reported. The JSON objects returned from my server had to meet the exact structure as it was being used in the current front end.

## Tech Stack
* NodeJS, Express, MongoDB, NGINX
* Testing/Utilities: K6, Loader.io, AWS (EC2 Instances)

#### Performance:
These are loader.io results from this DB and server configured on AWS with an NGINX load balancer over 4 EC2 instances.
* GET Questions (/qa/questions)
<img width="500" alt="Screen Shot 2022-09-07 at 9 18 58 AM" src="https://user-images.githubusercontent.com/96403295/188889027-a4025062-68c6-4f65-8766-ed044348dc49.png">
* GET Answers (/qa/questions/:question_id/answers)
<img width="500" alt="Screen Shot 2022-09-07 at 9 19 15 AM" src="https://user-images.githubusercontent.com/96403295/188889234-4473e644-3d24-4df7-a9e1-bd82f8835a80.png">
* POST Questions (/qa/questions)
<img width="500" alt="Screen Shot 2022-09-07 at 9 24 06 AM" src="https://user-images.githubusercontent.com/96403295/188889593-fdfd21ba-369a-49ee-b8ba-798e1bd1bc58.png">
* POST Answers (/qa/questions/:question_id/answers)
<img width="500" alt="Screen Shot 2022-09-07 at 9 24 45 AM" src="https://user-images.githubusercontent.com/96403295/188889657-92d22598-8a8c-472f-a3a8-01ff30b54472.png">

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
