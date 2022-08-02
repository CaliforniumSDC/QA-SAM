const { MongoClient, ObjectID } = require("mongodb");

//Mongo Variables
const uri = "mongodb://localhost:27017/";
const dbName = 'QA';
const coll = 'Q3';
let dbConnect;

//DB Connection
MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.log('ERROR in Mongo Connection: ', err);
    return;
  }
  dbConnect = client.db(dbName).collection(coll);
  console.log('You are successfully connected to mongoDB! ');
});

//Controller Functions
async function getQuestions(request) {
  const query = { product_id: request.query.product_id, reported: false};
    const options = {
      projection: {
        _id: 0,
        question_id: '$_id',
        question_body: '$body',
        date_written: 1,
        asker_name: '$asker_name',
        question_helpfulness: '$helpful',
        answers: {
          $arrayToObject: {
            $map: {
              input: '$answers',
              as: 'i',
              in: {
                k: {$toString: '$$i._id'},
                v: {
                  id: '$$i._id',
                  body: '$$i.body',
                  date: '$$i.date_written',
                  answerer_name: '$$i.answerer_name',
                  helpfulness: { $toInt: '$$i.helpful' },
                  photos: []
                }
              }
            }
          }
        },
      },
    }
  return await dbConnect.find(query, options).limit(parseInt(request.query.count) || 5 ).toArray();
}

async function getAnswers(request) {
  const query = { _id: ObjectID(request.params.question_id) };
  const options = {
    projection: {
      _id: 0,
      answers: {
        $map: {
          input: {
            $filter: {
              input: '$answers',
              cond: { reported: { $ne: [ 'reported', false ] } }
            },
          },
          as: 'i',
          in: {
            answer_id: '$$i._id',
            body: '$$i.body',
            date: '$$i.date_written',
            answerer_name: '$$i.answerer_name',
            helpfulness: '$$i.helpful',
            photos: '$$i.photos'
          }
      }}
    }
  }
  return await dbConnect.find(query, options).limit(parseInt(request.query.count || 5)).toArray();
}

async function postQuestion(request) {

  const doc = {
    product_id: request.query.product_id,
    date_written: new Date().getTime().toString(),
    body: request.query.body,
    asker_email: request.query.body,
    asker_name: request.query.name,
    helpful: 0,
    reported: false,
    answers: [],
  }
  return await dbConnect.insertOne(doc);
}

async function postAnswer(request) {
  const filter = { _id: ObjectID(request.params.question_id) };
  let photosArr = request.query.photos.map((item) => {
    return {
      _id: new ObjectID(),
      url: item
    };
  })
  const updatedoc = {
    $push: {
      answers : {
        _id: new ObjectID(),
        question_id: ObjectID(request.params.question_id),
        date_written: new Date().getTime().toString(),
        reported: false,
        helpful: 0,
        body: request.query.body,
        answerer_email: request.query.email,
        answerer_name: request.query.name,
        photos: photosArr,
      }
    }
  }
  return await dbConnect.updateOne(filter, updatedoc);
}

async function markQAsHelpful(request) {
  const query = { _id: ObjectID(request.params.question_id) };
  const updateDoc = { $inc: { helpful: 1 } };
  return await dbConnect.updateOne(query, updateDoc);
}

async function reportQuestion(request) {
  const query = { _id: ObjectID(request.params.question_id) };
  const updateDoc = { $set: { reported: true } };
  return await dbConnect.updateOne(query, updateDoc);
}

async function markAnsAsHelpful(request) {
  const query = { "answers._id": ObjectID(request.params.answer_id) };
  const updateDoc = { $inc: { "answers.$.helpful": 1 } };
  return await dbConnect.updateOne(query, updateDoc);
}

async function reportAnswer(request) {
  const query = { "answers._id": ObjectID(request.params.answer_id) };
  const updateDoc = { $set: { "answers.$.reported": true } };
  return await dbConnect.updateOne(query, updateDoc);
}

module.exports = {
getQuestions: getQuestions,
getAnswers: getAnswers,
markQAsHelpful: markQAsHelpful,
postQuestion: postQuestion,
postAnswer: postAnswer,
reportQuestion: reportQuestion,
markAnsAsHelpful: markAnsAsHelpful,
reportAnswer: reportAnswer
};