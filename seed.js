/* eslint-disable no-console */
const mongodb = require('mongodb').MongoClient;
const URL = require('./src/config');

// mock data
const practices = [
  { id: 1, name: 'Node', description: 'Build custom Node.js projects' },
  { id: 2, name: 'React', description: 'Build custom SPA' },
  { id: 3, name: 'Ruby', description: 'Build custom RoR projects' },
  { id: 4, name: 'Python', description: 'Build custom Flask projects' },
];

const tokens = [
  { token: 'e2bb0497-586f-4320-862e-a825044a1d3a' },
  { token: '05cbbe04-aa1c-42c8-8541-1661e4c29f54' },
  { token: '08a8939d-eaa4-42aa-8fc0-83583de60ea5' },
  { token: 'c9457b9a-8eb2-4fe2-a6eb-eb9c406de189' },
  { token: '9aa306cf-4c27-42e1-bc0f-a724201e1fac' },
  { token: 'e9481d09-1206-4698-b92c-9385f3897ca6' },
  { token: 'a08e043e-bee8-4238-952b-e127fbe47651' },
  { token: '8237d10c-347b-431b-a389-c7725e0d9f26' },
];

const technologies = [
  { id: 1, practice_id: 1, name: 'Node', description: 'Node.js ^6.11.0' },
  { id: 2, practice_id: 1, name: 'Express', description: 'Express.js ^4.15.0' },
  { id: 3, practice_id: 2, name: 'React', description: 'React.js' },
  { id: 4, practice_id: 2, name: 'Lodash', description: 'Lodash' },
  { id: 5, practice_id: 2, name: 'Moment', description: 'Moment' },
  { id: 6, practice_id: 2, name: 'Redux', description: 'Redux' },
  { id: 7, practice_id: 3, name: 'RoR', description: 'Ruby' },
  { id: 8, practice_id: 4, name: 'Python', description: 'Flask' },
];

mongodb.connect(URL, (err, db) => {
  const practicesCollection = db.collection('practices');
  const tokensCollection = db.collection('tokens');
  const technologiesCollection = db.collection('technologies');

  const practiseP = new Promise((resolve, reject) => {
    practicesCollection.insertMany(practices, (err, results) => {
      resolve(results);
    });
  });

  const tokensP = new Promise((resolve, reject) => {
    tokensCollection.insertMany(tokens, (err, results) => {
      resolve(results);
    });
  });

  const techP = new Promise((resolve, reject) => {
    technologiesCollection.insertMany(technologies, (err, results) => {
      resolve(results);
    });
  });

  Promise.all([practiseP, tokensP, techP])
    .then(() => {
      db.close();
      console.log('Success :)');
    });
});
