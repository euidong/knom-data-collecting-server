const httpPort = 8000;

const express = require('express'); // import express module
const fs = require('fs');
const cors = require('cors');

const app = express(); // create express app

app.use(express.json()); // parse incoming requests with JSON payloads
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send("hello, world");
});

app.post('/collect', (req, res) => {
  // handle POST request to /collect endpoint
  // Use Node.js built-in file system module to write request body data to a file

    const { roomname, membersCount, myId, timestamp, stats } = req.body;

    const dirname = `data/${roomname}-${myId}`;

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFile(`${dirname}/${timestamp}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
          res.send('Fail');
          throw err;
        }
        console.log('Request data saved to file');
        res.send('Sucess');
    });
});

app.listen(httpPort, () => {
  console.log(`Server listening on port ${httpPort}`);
});