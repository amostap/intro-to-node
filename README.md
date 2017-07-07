# intro-to-node
Introduction to node from Pluralsight

- clone project;
- run mongod;

# Commands

- `npm i`
- `npm seed` (make db and seed mock data, port: `27017` (mongo default, or can be changed in `src/config.js`))
- `npm run dev` (for development, port: 5000)
- `npm start` (for starting server, port: 3000)

# API (open)
- `http://localhost:{port}/api/tokens`

# API (with `token` in head)
 - GET: `http://localhost:{port}/api/practices` -> [practices]
 - GET: `http://localhost:{port}/api/technologies/:practicesID` -> [technsologies]
 - GET: `http://localhost:{port}/api/technologies/2?page=1&per=5` -> [technsologies with pagination(page, per - optional, default value: `page: 1`, `per: 5`)]
